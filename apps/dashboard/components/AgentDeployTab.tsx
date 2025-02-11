import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { IconButton, List, ListItem } from '@mui/joy';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import useModal from '@app/hooks/useModal';

import { AgentVisibility, DatastoreVisibility } from '@chaindesk/prisma';
import useAgent from '@chaindesk/ui/hooks/useAgent';
import useStateReducer from '@chaindesk/ui/hooks/useStateReducer';

import SettingCard from './ui/SettingCard';
import UsageLimitModal from './UsageLimitModal';

const SlackBotModal = dynamic(
  () => import('@app/components/SlackSettingsModal'),
  {
    ssr: false,
  }
);

const IFrameWidgetSettings = dynamic(
  () => import('@app/components/IFrameWidgetSettings'),
  {
    ssr: false,
  }
);

const StandalonePageWidgetSettings = dynamic(
  () => import('@app/components/StandalonePageWidgetSettings'),
  {
    ssr: false,
  }
);

const ZendeskSettings = dynamic(
  () => import('@app/components/ZendeskSettings'),
  {
    ssr: false,
  }
);

const WhatsAppSettings = dynamic(
  () => import('@app/components/WhatsAppSettings'),
  {
    ssr: false,
  }
);

const TelegramSettings = dynamic(
  () => import('@app/components/TelegramSettings'),
  {
    ssr: false,
  }
);

type Props = {
  agentId: string;
};

function AgentDeployTab(props: Props) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [state, setState] = useStateReducer({
    isSlackModalOpen: false,
    isUsageModalOpen: false,
  });

  const iframeWidgetModal = useModal();
  const standalonePageModal = useModal();
  const zendeskModal = useModal();
  const whatsappModal = useModal();
  const telegramModal = useModal();

  const { query, mutation } = useAgent({
    id: props.agentId as string,
  });

  const agent = query?.data;

  if (!agent) {
    return null;
  }

  return (
    <>
      <SettingCard
        title="Implementar"
        description="Implementa tu scout en tu flujo de trabajo con estas herramientas"
        disableSubmitButton
        cardProps={{
          sx: {
            maxWidth: '100%',
          },
        }}
      >
        <List
          variant="plain"
          sx={{
            borderRadius: 'lg',
          }}
        >
          {[
            {
              name: 'Web / Standalone - Página web sin código alojada en Bravilo',
              icon: <Typography sx={{ fontSize: 32 }}>💅</Typography>,
              action: () => {
                standalonePageModal.open();
              },
              publicAgentRequired: true,
            },
            {
              hidden: false,
              name: 'WhatsApp',
              icon: (
                <Image
                  className="w-8"
                  src="/integrations/whatsapp/icon.svg"
                  width={100}
                  height={100}
                  alt="Whatsapp Logo"
                />
              ),
              action: async () => {
                whatsappModal.open();
              },
              isPremium: true,
            },
            {
              hidden: false,
              name: 'Telegram',
              icon: (
                <Image
                  className="w-8"
                  src="/integrations/telegram/icon.svg"
                  width={100}
                  height={100}
                  alt="Telegram Logo"
                />
              ),
              action: async () => {
                telegramModal.open();
              },
              isPremium: true,
            },
          ]
            .filter((each) =>
              router.query.showHidden === 'true' ? true : !each.hidden
            )
            .map((each, index, arr) => (
              <ListItem
                key={index}
                sx={(theme) => ({
                  borderBottomWidth: index < arr.length - 1 ? 0.1 : 0,
                  borderBottomColor: theme.palette.divider,
                  minHeight: 70,
                })}
              >
                <Stack direction="row" gap={2} alignItems={'center'}>
                  {each.icon}
                  <Typography fontWeight={'bold'}>{each.name}</Typography>

                  {each.isPremium && (
                    <Chip color="warning" size="sm" variant="soft">
                      premium
                    </Chip>
                  )}
                </Stack>

                <Button
                  size="sm"
                  variant="outlined"
                  startDecorator={<TuneRoundedIcon />}
                  sx={{ ml: 'auto' }}
                  onClick={each.action}
                >
                  Configuracion
                </Button>
              </ListItem>
            ))}
        </List>
      </SettingCard>
    </>
  );
}

export default AgentDeployTab;
