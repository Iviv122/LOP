import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',

        primary: {
            main: '#3c3c3c',
            contrastText: '#ffffff',
        },

        secondary: {
            main: '#606060',
            contrastText: '#ffffff',
        },

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
});

export default theme;