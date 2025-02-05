import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Option, Select, Stack } from '@mui/joy';
import { FormLabel } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import axios from 'axios';
import cuid from 'cuid';
import mime from 'mime-types';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext, ValidationMode } from 'react-hook-form';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

import { upsertDatasource } from '@app/pages/api/datasources';
import getS3RootDomain from '@chaindesk/lib/get-s3-root-domain';
import { fetcher, generateActionFetcher, HTTP_METHOD } from '@chaindesk/lib/swr-fetcher';
import { GenerateUploadLinkRequest } from '@chaindesk/lib/types/dtos';
import { DatasourceSchema } from '@chaindesk/lib/types/models';
import { AppDatasource as Datasource, DatasourceType, Prisma } from '@chaindesk/prisma';
import Input from '@chaindesk/ui/Input';
import DatasourceTagsInput from '../DatasourceTagsInput';
import type { DatasourceFormProps } from './types';

const DatasourceText = ({ datasourceId, datastoreId, disabled }: { datasourceId?: string; datastoreId: string; disabled?: boolean; }) => {
  const methods = useFormContext();

  // Obtiene la información del datasource
  const { data: datasource } = useSWR(
    datasourceId ? `/api/datasources/${datasourceId}` : null,
    fetcher
  );

  // Obtiene el nombre del archivo desde la API
  const fileName = datasource?.fileName || `${datasourceId}.json`; // Usa el nombre real o json por defecto

  console.log("📌 Archivo esperado desde API:", fileName);

  // Construye la URL con la extensión correcta
  const query = useSWR(
    datasourceId
      ? `${getS3RootDomain()}/datastores/${datastoreId}/${datasourceId}/${fileName}`
      : null,
    fetcher
  );

  console.log("🛠 URL generada para acceder a S3:", query.data);

  useEffect(() => {
    if (query.data?.text) {
      methods.reset({
        ...methods.formState.defaultValues,
        datasourceText: query.data?.text,
      });
    }
  }, [query.data?.text]);

  if (!query?.data?.text) {
    return null;
  }

  return (
    <Textarea
      minRows={4}
      disabled={disabled}
      {...methods.register('datasourceText')}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        methods.setValue('datasourceText', e.target.value, { shouldDirty: true });
      }}
    />
  );
};

export default function BaseForm(props: DatasourceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<DatasourceSchema>({
    resolver: zodResolver(props.schema),
    mode: props.mode,
    defaultValues: { ...props?.defaultValues },
  });

  const { register, control, handleSubmit, formState: { errors, defaultValues, isDirty, dirtyFields, isValid } } = methods;
  
  const upsertDatasourceMutation = useSWRMutation<Prisma.PromiseReturnType<typeof upsertDatasource>>(
    `/api/datasources`,
    generateActionFetcher(HTTP_METHOD.POST)<DatasourceSchema>
  );

  const onSubmit = async (values: DatasourceSchema) => {
    try {
      setIsLoading(true);
      const datasourceText = !dirtyFields['datasourceText'] ? undefined : values.datasourceText;

      const payload = {
        id: cuid(),
        ...values,
        config: { ...defaultValues?.config, ...values?.config },
        isUpdateText: !!datasourceText,
        file: undefined,
      } as DatasourceSchema;

      if (datasourceText || payload.type === DatasourceType.text || payload.type === DatasourceType.file) {
        let mime_type = '';
        let fileName = '';
        let file = undefined as File | undefined;

        if (datasourceText || payload.type === DatasourceType.text) {
          mime_type = 'text/plain';
          fileName = `${payload.id}/${payload.id}.txt`;
          file = new File([datasourceText!], fileName, { type: mime_type });
          payload['type'] = DatasourceType.file;
          payload['config'] = { ...values.config, fileSize: file.size, mime_type };
        } else if ((values as any).file.type) {
          mime_type = (values as any).file.type as string;
          fileName = `${payload.id}/${payload.id}.${mime.extension(mime_type)}`;
          file = (values as any)?.file as File;
        }

        if (file) {
          const uploadLinkRes = await axios.post(
            `/api/datastores/${props.defaultValues?.datastoreId}/generate-upload-link`,
            { fileName, type: mime_type } as GenerateUploadLinkRequest
          );

          await axios.put(uploadLinkRes.data, file, {
            headers: { 'Content-Type': mime_type },
          });
        }
      }

      const datasource = await upsertDatasourceMutation.trigger(payload as any);
      props?.onSubmitSuccess?.(datasource!);
    } catch (err) {
      console.log('error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {props.hideName ? null : (
          <Input label="Name (optional)" control={control as any} {...register('name')} />
        )}
        {props.children}
        <DatasourceTagsInput />

        {!props.hideText && defaultValues?.datastoreId && defaultValues?.id && (
          <details>
            <summary>Extracted Text</summary>
            <DatasourceText datastoreId={defaultValues?.datastoreId} datasourceId={defaultValues?.id} disabled={false} />
          </details>
        )}

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" color="neutral" onClick={props.onBack}>
            Back
          </Button>
          <Button type="submit" variant="soft" color="primary" loading={isLoading || upsertDatasourceMutation.isMutating} disabled={!isDirty || !isValid}>
            Finish
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
