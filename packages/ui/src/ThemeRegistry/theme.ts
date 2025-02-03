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
        // Definición de la paleta primaria con el color principal #0071E3.
        // Puedes ajustar los tonos según lo necesites.
        primary: {
          50: '#e6f2fa',     // tono muy claro
          100: '#b3d0f4',
          200: '#80aded',
          300: '#0071E3',    // aquí usamos el color principal
          400: '#0067d1',
          500: '#0071E3',    // color principal
          600: '#005dbb',
          700: '#004a93',
          800: '#00366b',
          900: '#002243',
          softActiveBg: '#0071E3', // valor para estados "soft active"
        },
        // Definición del fondo de la aplicación
        background: {
          body: '#262626',
        },
        // Definición del color de texto principal
        text: {
          primary: '#FFFFFF',
        },
      },
      // Propiedad custom para definir un degradado (de #0071E3 a #FFFFFF)
      customColors: {
        gradient: 'linear-gradient(45deg, #0071E3, #FFFFFF)',
      },
    },
    dark: {
      // Puedes replicar o ajustar para el modo oscuro. En este ejemplo se usa lo mismo.
      palette: {
        primary: {
          50: '#e6f2fa',
          100: '#b3d0f4',
          200: '#80aded',
          300: '#0071E3',
          400: '#0067d1',
          500: '#0071E3',
          600: '#005dbb',
          700: '#004a93',
          800: '#00366b',
          900: '#002243',
          softActiveBg: '#0071E3',
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