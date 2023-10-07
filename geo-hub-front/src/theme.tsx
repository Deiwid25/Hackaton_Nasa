import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#081f2d',
      dark: '#0285be',
      light: '#0285be',
    },
    secondary: {
      main: '#ffffff',
      dark: '#184287',
      light: '#0285BE',
    },
    info: {
      main: '#0288d1',
    },
  },
  typography: {
    fontFamily: 'Rubik',
    button: {
      fontFamily: 'Rubik',
      fontWeight: 600,
    },
    h1: {
      fontSize: 40,
      fontWeight: 700,
    },
    h2: {
      fontSize: 34,
      fontWeight: 700,
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
    },
    body1: {
      fontSize: 18,
      fontWeight: 400,
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
    },
    body3: {
      fontSize: 14,
      fontWeight: 400,
    },
    body4: {
      fontSize: 10,
      fontWeight: 400,
    },
    bodyMedium1: {
      fontSize: 18,
      fontWeight: 500,
    },
    bodyMedium2: {
      fontSize: 16,
      fontWeight: 500,
    },
    bodyMedium3: {
      fontSize: 14,
      fontWeight: 500,
    },
    bodyMedium4: {
      fontSize: 11,
      fontWeight: 500,
    },
    bodySemiBold1: {
      fontSize: 22,
      fontWeight: 600,
    },
    bodySemiBold2: {
      fontSize: 18,
      fontWeight: 600,
    },
    bodySemiBold3: {
      fontSize: 16,
      fontWeight: 600,
    },
    bodySemiBold4: {
      fontSize: 14,
      fontWeight: 600,
    },
    bodyBold1: {
      fontSize: 22,
      fontWeight: 700,
    },
    bodyBold2: {
      fontSize: 18,
      fontWeight: 700,
    },
    bodyBold3: {
      fontSize: 16,
      fontWeight: 700,
    },
    bodyBold4: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#081f2d',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#081f2d',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#184287',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0285BE',
            color: '#ffffff',
          },
        },
        contained: {
          backgroundColor: '#184287',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0285BE',
            color: '#ffffff',
          },
        },
        outlined: {
          backgroundColor: '#ffffff',
          color: '#184287',
          borderColor: '#184287',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#0285BE',
            borderColor: '#0285BE',
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: '#184287',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#0285BE',
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
