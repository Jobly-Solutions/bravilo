import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useSession } from 'next-auth/react';
import React from 'react';

import { DatasourceType } from '@bravilo/prisma'; // Cambiado de @chaindesk/prisma a @bravilo/prisma

import UsageLimitModal from '../UsageLimitModal';

type Props = {
  onSelect: (type: DatasourceType) => any;
};

type DatsourceOption = {
  type: DatasourceType;
  label: string;
  description: string;
  icon?: any;
  disabled?: boolean;
  isPremium?: boolean | undefined;
};

const options: DatsourceOption[] = [
  {
    type: DatasourceType.web_page,
    label: 'Página Web',
    description: 'Extrae texto de una página web específica',
    icon: undefined,
  },
  {
    type: DatasourceType.web_site,
    label: 'Sitio Web',
    description: 'Extrae texto de todas las páginas de un sitio web',
    icon: undefined,
    isPremium: true,
  },
  {
    type: 'file' as any,
    label: 'Archivo',
    description: 'Puede ser: PDF, CSV, JSON, Texto, PowerPoint, Word, Excel',
    disabled: false,
  },
  {
    type: DatasourceType.qa,
    label: 'Preguntas y Respuestas',
    description: 'Mejora las respuestas con pares explícitos de preguntas y respuestas',
    disabled: false,
  },
  {
    type: DatasourceType.text,
    label: 'Texto',
    description: 'Pega algún texto',
    icon: undefined,
  },
  {
    type: 'google_drive_folder' as any,
    label: 'Google Drive™',
    description: 'Conéctate a tus archivos de Google Drive',
    isPremium: true,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1024px-Google_Drive_icon_%282020%29.svg.png?20221103153031',
  },
  {
    type: 'youtube_video',
    label: 'YouTube',
    description:
      'Pega un video, lista de reproducción o canal de YouTube y conviértelo en tu fuente de conocimiento',
    disabled: false,
    icon: 'https://www.svgrepo.com/show/13671/youtube.svg',
    isPremium: true,
  },
  {
    type: 'notion' as any,
    label: 'Notion',
    description: 'Conecta tu espacio de trabajo de Notion',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
    disabled: false,
    isPremium: true,
  },
];

const DatasourceOptions = (props: Props) => {
  const { data: session, status } = useSession();
  const [showUsageLimitModal, setShowUsageLimitModal] = React.useState(false);
  return (
    <div className="flex space-x-4">
      <Stack className="space-y-4" direction={'row'} flexWrap={'wrap'}>
        {options.map((each) => (
          <Sheet
            key={each.type}
            variant="outlined"
            sx={{
              borderRadius: 'md',
              p: 1.5,
              width: '100%',
              ':hover': { cursor: 'pointer' },
            }}
            onClick={
              each.disabled ||
              (each.isPremium && !session?.organization?.isPremium)
                ? () => setShowUsageLimitModal(true)
                : () => props.onSelect(each.type)
            }
          >
            <Stack gap={1}>
              <Stack gap={1} direction="row">
                {each.icon && <img src={each.icon} className="h-4" alt="" />}
                <Typography level="body-md" fontWeight={'bold'}>
                  {each.label}
                </Typography>
                {/*{each.isPremium && (
                  <Chip variant="soft" color="warning" size="sm">
                    premium
                  </Chip>
                )}*/}
                {each.disabled && (
                  <Chip variant="soft" color="neutral" size="sm">
                    Próximamente
                  </Chip>
                )}
              </Stack>
              <Typography level="body-sm">{each.description}</Typography>
            </Stack>
          </Sheet>
        ))}
      </Stack>

      <UsageLimitModal
        isOpen={showUsageLimitModal}
        handleClose={() => setShowUsageLimitModal(false)}
        title="Función Premium"
        description="Actualiza tu cuenta para acceder a esta función"
      />
    </div>
  );
};

export default DatasourceOptions;