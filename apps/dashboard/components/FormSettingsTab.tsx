import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/joy/Alert';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { useRouter } from 'next/router';
import React from 'react';

import { RouteNames } from '@chaindesk/lib/types';
import Input from '@chaindesk/ui/Input';
import Loader from '@chaindesk/ui/Loader';

import SettingCard from './ui/SettingCard';
import BlablaFormProvider from './BlablaFormProvider';

type Props = {
  formId: string;
};

function FormSettingsTab({ formId }: Props) {
  const router = useRouter();

  return (
    <BlablaFormProvider formId={formId}>
      {({ query, mutation, deleteMutation, methods }) => {
        if (!query.data && query.isLoading) {
          return <Loader />;
        }

        return (
          <Stack sx={{ width: '100%', mx: 'auto', gap: 2 }}>
            <SettingCard
              title="Configuración General"
              disableSubmitButton
              cardProps={{
                sx: {
                  width: '100%',
                },
              }}
            >
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  control={methods.control}
                  {...methods.register('name')}
                ></Input>
              </FormControl>
            </SettingCard>

            <SettingCard
              title="Eliminar Formulario"
              description="Eliminará el formulario permanentemente"
              cardProps={{
                color: 'danger',
              }}
              submitButtonProps={{
                onClick: async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const confirmed = await window.confirm(
                    'Todas las respuestas serán eliminadas. ¿Estás seguro?'
                  );

                  if (confirmed) {
                    await deleteMutation.trigger();
                    router.replace(RouteNames.FORMS);
                  }
                },
                color: 'danger',
                children: 'Eliminar',
                startDecorator: <DeleteIcon />,
                loading: deleteMutation.isMutating,
              }}
            >
              <FormControl sx={{ gap: 1 }}>
                <Alert color="danger">
                  Eliminar el formulario y todas las respuestas permanentemente
                </Alert>
              </FormControl>
            </SettingCard>
          </Stack>
        );
      }}
    </BlablaFormProvider>
  );
}
export default FormSettingsTab;
