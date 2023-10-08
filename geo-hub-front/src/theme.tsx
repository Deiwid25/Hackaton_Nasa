import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#126744',  // verde básico
      dark: '#006400',  // verde oscuro
      light: '#20b572',  // verde claro
    },
    secondary: {
      main: '#ffffff',
      dark: '#006400',  // verde oscuro
      light: '#20b572',  // verde claro
    },
    info: {
      main: '#126744',  // verde básico
    },
  },
  typography: {
    // ... (el resto del código se mantiene igual)
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#126744',  // verde básico
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#126744',  // verde básico
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#006400',  // verde oscuro
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#20b572',  // verde claro
            color: '#ffffff',
          },
        },
        contained: {
          backgroundColor: '#006400',  // verde oscuro
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#20b572',  // verde claro
            color: '#ffffff',
          },
        },
        outlined: {
          backgroundColor: '#ffffff',
          color: '#006400',  // verde oscuro
          borderColor: '#006400',  // verde oscuro
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#20b572',  // verde claro
            borderColor: '#20b572',  // verde claro
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: '#006400',  // verde oscuro
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#20b572',  // verde claro
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 0,
          overflow: 'unset',
          width: 40,
          height: 25,
        },
        switchBase: {
          '&.Mui-checked': {
            '& + .MuiSwitch-track': {
              backgroundColor: 'var(--blue3-500)',
              opacity: 1,
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: 'var(--neutral-300)',
              width: 15,
              height: 15,
              margin: '-4px 0 0 -9px',
            },
          },
        },
        track: {
          borderRadius: 40,
          border: 'solid var(--shades-0)',
          backgroundColor: 'var(--neutral-50)',
          opacity: 1,
          boxSizing: 'border-box',
        },
        thumb: {
          boxShadow: 'none',
          backgroundColor: 'var(--neutral-300)',
          width: 15,
          height: 15,
          margin: '-4px 0 0 -3px',
        },
        checked: {},
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    bodyMedium1: React.CSSProperties;
    bodyMedium2: React.CSSProperties;
    bodyMedium3: React.CSSProperties;
    bodyMedium4: React.CSSProperties;
    bodySemiBold1: React.CSSProperties;
    bodySemiBold2: React.CSSProperties;
    bodySemiBold3: React.CSSProperties;
    bodySemiBold4: React.CSSProperties;
    bodyBold1: React.CSSProperties;
    bodyBold2: React.CSSProperties;
    bodyBold3: React.CSSProperties;
    bodyBold4: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    bodyMedium1?: React.CSSProperties;
    bodyMedium2?: React.CSSProperties;
    bodyMedium3?: React.CSSProperties;
    bodyMedium4?: React.CSSProperties;
    bodySemiBold1?: React.CSSProperties;
    bodySemiBold2?: React.CSSProperties;
    bodySemiBold3?: React.CSSProperties;
    bodySemiBold4?: React.CSSProperties;
    bodyBold1?: React.CSSProperties;
    bodyBold2?: React.CSSProperties;
    bodyBold3?: React.CSSProperties;
    bodyBold4?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    bodyMedium1: true;
    bodyMedium2: true;
    bodyMedium3: true;
    bodyMedium4: true;
    bodySemiBold1: true;
    bodySemiBold2: true;
    bodySemiBold3: true;
    bodySemiBold4: true;
    bodyBold1: true;
    bodyBold2: true;
    bodyBold3: true;
    bodyBold4: true;
  }
}
