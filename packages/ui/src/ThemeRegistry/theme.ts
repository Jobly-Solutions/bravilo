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

// Extiende el tema con tu configuración personalizada
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // Paleta primaria: se utiliza #0071E3 como color principal
        primary: {
          50: '#e6f0fb',
          100: '#bae0f7',
          200: '#8fd0f3',
          300: '#65c1ef',
          400: '#3ab1eb',
          500: '#0071E3', // Color principal
          600: '#0065c7',
          700: '#0058aa',
          800: '#004c8e',
          900: '#003f72',
        },
        // Definición del color de fondo
        background: {
          body: '#262626',
        },
        // Definición de color para textos
        text: {
          primary: '#FFFFFF',
        },
      },
      // Puedes definir propiedades custom si las deseas usar en tus componentes
      // Por ejemplo, un degradado que combine #0071E3 y #FFFFFF:
      customColors: {
        gradient: 'linear-gradient(45deg, #0071E3, #FFFFFF)',
      },
    },
    dark: {
      // En modo oscuro puedes usar los mismos valores o ajustarlos según necesites.
      palette: {
        primary: {
          50: '#e6f0fb',
          100: '#bae0f7',
          200: '#8fd0f3',
          300: '#65c1ef',
          400: '#3ab1eb',
          500: '#0071E3',
          600: '#0065c7',
          700: '#0058aa',
          800: '#004c8e',
          900: '#003f72',
        },
        background: {
          body: '#262626',
        },
        text: {
          primary: '#FFFFFF',
        },
      },
      customColors: {
        gradient: 'linear-gradient(45deg, #0071E3, #FFFFFF)',
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
