import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    // Primary stays neutral (dark gray)
    primary: {
      main: '#3c3c3c',
      contrastText: '#ffffff',
    },

    // Secondary slightly lighter gray
    secondary: {
      main: '#606060',
      contrastText: '#ffffff',
    },

    // Backgrounds
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },

    // Text colors
    text: {
      primary: '#3c3c3c',
      secondary: '#606060',
      disabled: '#979797',
    },

    // Divider & borders
    divider: '#dedede',

    // Greyscale palette
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#f0f0f0',
      300: '#dedede',
      400: '#c2c2c2',
      500: '#979797',
      600: '#818181',
      700: '#606060',
      800: '#3c3c3c',
      900: '#3c3c3c',
    },
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { color: '#3c3c3c' },
    h2: { color: '#3c3c3c' },
    h3: { color: '#3c3c3c' },
    body1: { color: '#3c3c3c' },
    body2: { color: '#606060' },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // removes default gradient in dark mode contexts
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#dedede',
        },
      },
    },
  },
});

export default theme;