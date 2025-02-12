import AddIcon from '@mui/icons-material/Add';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { CircularProgress, type ColorPaletteProp } from '@mui/joy';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Stack from '@mui/joy/Stack';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import * as React from 'react';

import Layout from '@app/components/Layout';
import UsageLimitModal from '@app/components/UsageLimitModal';
import useGetDatastoreQuery from '@app/hooks/useGetDatastoreQuery';

import guardDataProcessingUsage from '@chaindesk/lib/guard-data-processing-usage';
import { RouteNames } from '@chaindesk/lib/types';
import { withAuth } from '@chaindesk/lib/withAuth';
import useStateReducer from '@chaindesk/ui/hooks/useStateReducer';

const CreateDatasourceModal = dynamic(
  () => import('@app/components/CreateDatasourceModal'),
  {
    ssr: false,
  }
);

const BaseDeDatosSettings = dynamic(
  () => import('@app/components/DatastoreSettings'),
  {
    ssr: false,
  }
);

const FuentesDeDatos = dynamic(() => import('@app/components/Datasources'), {
  ssr: false,
});

export default function BaseDeDatosPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [state, setState] = useStateReducer({
    isCreateDatasourceModalOpen: false,
    currentDatastoreId: undefined as string | undefined,
    isUsageLimitModalOpen: false,
  });

  const { getDatastoreQuery } = useGetDatastoreQuery({});

  const handleChangeTab = (tab: string) => {
    router.query.tab = tab;
    router.replace(router);
  };

  React.useEffect(() => {
    if (router.isReady && typeof window !== 'undefined' && !router.query.tab) {
      handleChangeTab('fuentes-de-datos');
    }
  }, [router.isReady, router.query.tab]);

  if (!getDatastoreQuery?.data) {
    return (
      <Stack sx={{ height: '100%' }}>
        <CircularProgress size="sm" sx={{ m: 'auto' }} />
      </Stack>
    );
  }

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        width: '100%',
        gap: 1,
      }}
    >
      <>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon />}
          sx={{ '--Breadcrumbs-gap': '1rem', '--Icon-fontSize': '16px', fontWeight: 'lg', color: 'neutral.400', px: 0 }}
        >
          <Link href={RouteNames.HOME}>
            <HomeRoundedIcon />
          </Link>
          <Link href={RouteNames.DATASTORES}>
            <Typography fontSize="inherit" color="neutral" className="hover:underline">
              Bases de Datos
            </Typography>
          </Link>
          <Typography fontSize="inherit" color="neutral">
            {getDatastoreQuery?.data?.name}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <Typography level="h1" fontSize="xl4">
              {getDatastoreQuery?.data?.name}
            </Typography>
            <Chip
              size="sm"
              variant="soft"
              color={{ public: 'success', private: 'neutral' }[getDatastoreQuery?.data?.visibility!] as ColorPaletteProp}
            >
              {getDatastoreQuery?.data?.visibility}
            </Chip>
          </Box>

          <Box sx={{ display: 'flex', ml: 'auto', gap: 2, '& > *': { flexGrow: 1 } }}>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<AddIcon />}
              onClick={() => {
                try {
                  guardDataProcessingUsage({
                    usage: session?.organization.usage!,
                    plan: session?.organization.currentPlan!,
                  });
                  setState({ isCreateDatasourceModalOpen: true });
                } catch {
                  setState({ isUsageLimitModalOpen: true });
                }
              }}
            >
              Agregar Fuente de Datos
            </Button>
          </Box>
        </Box>

        <Stack direction={'row'} alignItems={'center'} gap={2} sx={{ width: '100%', mb: 4, mt: 4 }}>
          <Tabs
            aria-label="Tabs"
            value={(router.query.tab as string) || 'fuentes-de-datos'}
            size="md"
            sx={{ background: 'transparent', width: '100%' }}
            onChange={(event, value) => handleChangeTab(value as string)}
          >
            <TabList size="sm" sx={{ justifyContent: 'start' }}>
              <Tab indicatorInset value={'fuentes-de-datos'}>
                <ListItemDecorator>
                  <AutoGraphRoundedIcon />
                </ListItemDecorator>
                Fuentes de Datos
              </Tab>
              <Tab indicatorInset value={'configuracion'}>
                <ListItemDecorator>
                  <SettingsIcon />
                </ListItemDecorator>
                Configuración
              </Tab>
            </TabList>
          </Tabs>
        </Stack>

        {router.query.tab === 'fuentes-de-datos' && getDatastoreQuery?.data?.id && (
          <FuentesDeDatos datastoreId={getDatastoreQuery?.data?.id} />
        )}

        {getDatastoreQuery?.data && router.query.tab === 'configuracion' && (
          <Box sx={{ height: '100%', overflowY: 'scroll', mt: -5, pt: 4 }}>
            <BaseDeDatosSettings />
          </Box>
        )}

        <CreateDatasourceModal
          isOpen={state.isCreateDatasourceModalOpen}
          datastoreId={getDatastoreQuery?.data?.id}
          onSubmitSuccess={() => getDatastoreQuery.mutate()}
          handleClose={() => setState({ isCreateDatasourceModalOpen: false, currentDatastoreId: undefined })}
        />
      </>
      <UsageLimitModal isOpen={state.isUsageLimitModalOpen} handleClose={() => setState({ isUsageLimitModalOpen: false })} />
    </Box>
  );
}
DatastorePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps = withAuth(
//   async (ctx: GetServerSidePropsContext) => {
//     return {
//       props: {},
//     };
//   }
// );
