import { extendTheme } from '@mui/joy/styles';
import {
  Inter,
  Source_Code_Pro,
  Caveat,
  Bricolage_Grotesque,
} from 'next/font/google';

// Configuración de fuentes
const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: ['var(--joy-fontFamily-fallback)'],
  display: 'swap',
});
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  adjustFontFallback: false,
});
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
});

// Definición de colores principales
const PRIMARY_COLOR = '#0071E3'; // Azul principal
const WHITE_COLOR = '#FFFFFF'; // Blanco para textos
const BACKGROUND_COLOR = '#262626'; // Fondo oscuro
const GRADIENT = 'linear-gradient(45deg, #0071E3, #FFFFFF)'; // Degradado

// Extiende el tema con la configuración personalizada
const theme = extendTheme({
  cssVarPrefix: 'bravilo',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e6f2fa',
          100: '#b3d0f4',
          200: '#80aded',
          300: PRIMARY_COLOR,
          400: '#0067d1',
          500: PRIMARY_COLOR,
          600: '#005dbb',
          700: '#004a93',
          800: '#00366b',
          900: '#002243',
          softActiveBg: PRIMARY_COLOR,
        },
        background: {
          body: BACKGROUND_COLOR,
        },
        text: {
          primary: WHITE_COLOR,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#e6f2fa',
          100: '#b3d0f4',
          200: '#80aded',
          300: PRIMARY_COLOR,
          400: '#0067d1',
          500: PRIMARY_COLOR,
          600: '#005dbb',
          700: '#004a93',
          800: '#00366b',
          900: '#002243',
          softActiveBg: PRIMARY_COLOR,
        },
        background: {
          body: BACKGROUND_COLOR,
        },
        text: {
          primary: WHITE_COLOR,
        },
      },
    },
  },
  // Agregamos el degradado de forma global
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          background: GRADIENT,
        },
      },
    },
  },
  fontFamily: {
    body: inter.style.fontFamily,
    display: bricolage.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
});

export default theme;
