import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import router from 'next/router';
import React from 'react';

import { CreateAgentSchema } from '@chaindesk/lib/types/dtos';
import {
  Agent,
  AgentVisibility,
  AppDatasource as Datasource,
} from '@chaindesk/prisma';
import Input from '@chaindesk/ui/Input';

import AgentForm from '../AgentForm';
import ConnectForm from '../ConnectForm';
import SettingCard from '../ui/SettingCard';

type Props = {
  defaultValues?: CreateAgentSchema;
  onSubmitSucces?: (agent: Agent) => any;
  agentId?: string;
};

export default function AgentSecuritySettings(props: Props) {
  return props.agentId ? (
    <Stack gap={4}>
      <AgentForm agentId={router.query.agentId as string}>
        {({ query, mutation }) => (
          <ConnectForm<CreateAgentSchema>>
            {({ register, watch, formState, setValue }) => {
              const visibility = watch('visibility');

              return (
                <SettingCard
                  title="Acceso del Scout"
                  //   description="Enable this if you want to use  "
                  submitButtonProps={{
                    loading: mutation.isMutating,
                    disabled: !formState.isDirty || !formState.isValid,
                    children: 'Guardar',
                  }}
                >
                  <div className="flex flex-row">
                    <FormControl className="flex flex-row space-x-4">
                      <Checkbox
                        checked={visibility === AgentVisibility.public}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setValue('visibility', AgentVisibility.public, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          } else {
                            setValue('visibility', AgentVisibility.private, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }
                        }}
                      />
                      <div className="flex flex-col">
                        <FormLabel>Publico</FormLabel>
                        <Typography level="body-xs">
                        Cuando esté activado, tu Scout estará disponible sin necesidad de una clave de API.
                        </Typography>
                      </div>
                    </FormControl>
                  </div>
                </SettingCard>
              );
            }}
          </ConnectForm>
        )}
      </AgentForm>
      <AgentForm agentId={router.query.agentId as string}>
        {({ query, mutation }) => (
          <ConnectForm<CreateAgentSchema>>
            {({ register, watch, formState, setValue }) => {
              const config = watch('interfaceConfig');

              return (
                <SettingCard
                  title="Dominios autorizados"
                  description="Restringe el widget de chat a dominios específicos por razones de seguridad. Por ejemplo: example.com."
                  submitButtonProps={{
                    loading: mutation.isMutating,
                    disabled: !formState.isDirty || !formState.isValid,
                    children: 'Guardar',
                  }}
                >
                  <Textarea
                    placeholder={`example-1.com\nexample-2.com`}
                    minRows={3}
                    defaultValue={config?.authorizedDomains?.join('\n')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>{
                      //   e.stopPropagation();

                      try {
                        const str = e.target.value;

                        const values = str.split('\n');
                        const domains = values
                          .map((each) =>
                            each.trim()?.replace(/https?:\/\//, '')
                          )
                          .filter((each) => !!each)
                          .map((each) => {
                            let hostname = '';
                            try {
                              hostname = new URL(`http://${each}`).host;
                            } catch (err) {}

                            return hostname;
                          })
                          .filter((each) => each !== undefined);

                        setValue('interfaceConfig.authorizedDomains', domains, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      } catch (err) {
                        console.log('err', err);
                      }
                    }}
                  />
                </SettingCard>
              );
            }}
          </ConnectForm>
        )}
      </AgentForm>
      <AgentForm agentId={router.query.agentId as string}>
        {({ query, mutation }) => (
          <ConnectForm<CreateAgentSchema>>
            {({ register, watch, formState, setValue, control }) => {
              const isRateLimitEnabled = watch(
                'interfaceConfig.rateLimit.enabled'
              );

              return (
                <SettingCard
                  title="Límite de Tasa"
                  description="Utiliza la limitación de tasa para evitar el uso indebido de tu Scout."
                  submitButtonProps={{
                    loading: mutation.isMutating,
                    disabled: !formState.isDirty || !formState.isValid,
                    children: 'Guardar',
                  }}
                >
                  <div className="flex space-x-4">
                    <Checkbox
                      size="lg"
                      {...register('interfaceConfig.rateLimit.enabled')}
                      onChange={() => {
                        setValue(
                          'interfaceConfig.rateLimit.enabled',
                          !isRateLimitEnabled,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      checked={!!isRateLimitEnabled}
                    />

<div className="flex flex-col">
  <FormLabel>Habilitar Límite de Tasa</FormLabel>
  <Typography level="body-xs">
    X mensajes como máximo cada Y segundos
  </Typography>
</div>
</div>

<Stack gap={2} pl={4}>
  <Input
    control={control}
    label="Número máximo de consultas"
    disabled={!isRateLimitEnabled}
    placeholder="10"
    {...register('interfaceConfig.rateLimit.maxQueries')}
  />
  <Input
    control={control}
    label="Intervalo (en segundos)"
    disabled={!isRateLimitEnabled}
    placeholder="60"
    {...register('interfaceConfig.rateLimit.interval')}
  />
  <Input
    control={control}
    label="Mensaje cuando se alcanza el límite"
    placeholder="Límite de uso alcanzado"
    disabled={!isRateLimitEnabled}
    {...register('interfaceConfig.rateLimit.limitReachedMessage')}
  />
</Stack>

                </SettingCard>
              );
            }}
          </ConnectForm>
        )}
      </AgentForm>
    </Stack>
  ) : null;
}
