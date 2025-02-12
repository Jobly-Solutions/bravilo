import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Chip, Divider, IconButton } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

import accountConfig from '@chaindesk/lib/account-config';
import {
  DatasourceSchema,
  DatasourceWebSite,
} from '@chaindesk/lib/types/models';
import { DatasourceType } from '@chaindesk/prisma';
import Input from '@chaindesk/ui/Input';

import Base from './Base';
import type { DatasourceFormProps } from './types';

type Props = DatasourceFormProps<DatasourceWebSite> & {};

function Nested() {
  const { data: session, status } = useSession();
  const { control, register, trigger } = useFormContext<DatasourceWebSite>();
  const parameters = useFieldArray({
    control: control as Control<DatasourceSchema>,
    name: 'config.black_listed_urls',
  });

  return (
    <Stack gap={1}>
  <Stack gap={1}>
    <Input
      label="URL del Sitio Web"
      helperText="Ejemplo: https://example.com/"
      control={control as any}
      {...register('config.source_url')}
    />
    <Alert color="neutral">
      <Stack>
        Intentará automáticamente encontrar todas las páginas del sitio web durante un máximo de 45 segundos.
        <strong>
          Limitado a{' '}
          {
            accountConfig[session?.organization?.currentPlan!]?.limits
              ?.maxWebsiteURL
          }
          {' páginas según tu plan.'}
        </strong>
      </Stack>
    </Alert>
  </Stack>

  <Typography color="primary" fontWeight={'bold'} mx={'auto'} mt={2}>
    O
  </Typography>

  <Stack gap={1}>
    <Input
      label="URL del Sitemap"
      helperText="Ejemplo: https://example.com/sitemap.xml"
      control={control as any}
      {...register('config.sitemap')}
    />

    <Alert color="neutral">
      <Stack>
        Procesará todas las páginas dentro del sitemap.
        <strong>
          Limitado a{' '}
          {
            accountConfig[session?.organization?.currentPlan!]?.limits
              ?.maxWebsiteURL
          }
          {' páginas según tu plan.'}
        </strong>
      </Stack>
    </Alert>
  </Stack>

  <Divider sx={{ my: 2 }} />

  <Stack gap={1}>
    <Typography>URLs Excluidas</Typography>
    <Alert color="neutral">
      <Stack>
        <Typography>
          Las URLs excluidas serán ignoradas durante el escaneo. Se pueden usar patrones globales, por ejemplo: https://example.com/blog/*
        </Typography>
      </Stack>
    </Alert>

    <Stack gap={1}>
      {parameters.fields.map((field, index) => (
        <Stack key={index} direction="row" gap={1}>
          <Input
            key={index}
            control={control}
            sx={{ width: '100%', flex: 1 }}
            formControlProps={{ sx: { flex: 1 } }}
            {...register(`config.black_listed_urls.${index}`)}
          />
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => parameters.remove(index)}
          >
            <DeleteIcon fontSize="md" />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        startDecorator={<AddIcon fontSize="md" />}
        size="sm"
        onClick={() => {
          parameters.append('');
        }}
        sx={{ width: '70px' }}
      >
        Agregar
      </Button>
    </Stack>
  </Stack>
</Stack>

  );
}

export default function WebSiteForm(props: Props) {
  const { defaultValues, ...rest } = props;

  return (
    <Base
      schema={DatasourceSchema}
      {...rest}
      mode="onChange"
      defaultValues={{
        ...props.defaultValues!,
        type: DatasourceType.web_site,
      }}
    >
      <Nested />
    </Base>
  );
}
