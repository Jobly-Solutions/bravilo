import { Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, Typography, useColorScheme } from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
// import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AnalyticsContext } from '@app/components/Analytics';
import Logo from '@app/components/Logo';
import SEO from '@app/components/SEO';

import { appUrl } from '@chaindesk/lib/config';
import { RouteNames } from '@chaindesk/lib/types';
import Input from '@chaindesk/ui/Input';

type Props = {
  // subscription: Subscription | null;
};

type Fields = {
  email: string;
  password: string;
};

const Schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof Schema>;

export default function SignInPage() {
  // const { handleRedirects, handleSignInSuccess } = useAuth();
  const [globalFormError, setGlobalFormError] = useState<string>();
  const { mode, setMode } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { capture } = useContext(AnalyticsContext);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsReady(true);
    } else if (status === 'authenticated') {
      capture?.({ event: 'login' });

      const redirect = router.query.redirect as string | undefined;

      if (redirect) {
        // https://github.com/gmpetrov/databerry/issues/204
        // router.push(redirect);
        window.location.href = redirect;
      } else {
        // router.push(RouteNames.HOME);
        window.location.href = RouteNames.HOME;
      }
    }
  }, [status, router]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {},
  });

  const handleSubmitEmail = async (values: Schema) => {
    try {
      setIsLoading(true);
      await signIn('email', { email: values.email });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SEO
        title="Sign-in"
        description="Sign-in to your Bravilo account."
        baseUrl={appUrl}
        uri={RouteNames.SIGN_IN}
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Box
        className="min-h-screen w-screen max-w-[100%] flex"
        sx={(theme) => ({
          // background: theme.palette.background.surface,
        })}
      >
        <>
          <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
            <div className="flex w-full max-w-sm mx-auto lg:w-96">
              {!isReady && (
                <CircularProgress
                  size="sm"
                  variant="soft"
                  sx={{ mx: 'auto' }}
                />
              )}
              <Transition
                className={'w-full'}
                show={isReady}
                enter="duration-[350ms]"
                enterFrom="opacity-0 translate-y-[100px]"
                enterTo="opacity-100 translate-y-[0px] w-full"
                // leave="transition-opacity duration-150"
                // leaveFrom="opacity-100"
                // leaveTo="opacity-0"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="inline-flex items-center mr-auto space-x-2">
                    <a
                      href="https://dev.braviloai.com"
                      // className="absolute top-4 left-4 md:top-8 md:left-8"
                    >
                      <div className="inline-flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-transparent rounded shadow-sm shadow-zinc-950/20">
                          <Logo className="cursor-pointer w-14" />
                        </div>
                        <Typography level="h4" fontWeight="xl">
                          {`Bravilo AI`}
                        </Typography>
                      </div>
                    </a>

                    {/* <Typography level="h4" fontWeight="xl">
                      {`/`}
                    </Typography>

                    <Typography level="h4" fontWeight="xl">
                      Sign in
                    </Typography> */}
                  </div>
                </div>

                <div className="w-full mt-8">
                  <div className="w-full mt-6">
                    <form
                      className="flex flex-col w-full space-y-4"
                      onSubmit={handleSubmit(handleSubmitEmail)}
                    >
                      <Input
                        label="Email"
                        control={control as any}
                        size="lg"
                        {...register('email')}
                      ></Input>

                      <Button
                        // disabled={!isValid}
                        type="submit"
                        variant="solid"
                        color="primary"
                        size="lg"
                        loading={isLoading}
                      >
                       Iniciar Sesión
                      </Button>
                    </form>
                  </div>

                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex justify-center">
                        <Divider sx={{ width: '100%', my: 'auto' }} />

                        {/* <div className="w-full border-t border-gray-500" /> */}
                      </div>
                      <div className="relative flex justify-center">
                        <Typography
                          level="body-xs"
                          className="px-2"
                          sx={{ backgroundColor: 'background.surface' }}
                        >
                          O continuar con
                        </Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mt-6 cursor-pointer">
                      <Button
                        size="lg"
                        onClick={() => signIn('google')}
                        // className="bg-white"
                        variant="outlined"
                        color="neutral"
                        startDecorator={
                          <img
                            style={{
                              width: '20px',
                              height: '20px',
                              marginRight: '0px',
                            }}
                            src="/google-icon.png"
                          />
                        }
                        sx={{
                          fontFamily: 'Roboto',
                          backgroundColor: 'white',
                          // color: '#7C7F82',
                          color: '#1F1F1F',
                          fontWeight: 500,
                          fontSize: '14px',
                          minHeight: '40px',

                          '&:hover': {
                            backgroundColor: 'white',
                          },
                        }}
                      >
                        Iniciar Sesión con Google
                      </Button>

                     {/* <Button
                        size="lg"
                        onClick={() => signIn('github')}
                        // className="bg-white"
                        variant="outlined"
                        color="neutral"
                        sx={{
                          fontWeight: 500,
                          fontSize: '14px',
                          minHeight: '40px',
                        }}
                      >
                        <GitHubIcon />
                      </Button> */}
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      </Box>
    </>
  );
}
