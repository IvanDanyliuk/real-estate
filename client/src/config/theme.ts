import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#40B5F9',
      dark: '#0B9EF3',
    },
    secondary: {
      light: '#EEEEEE',
      main: '#7B7B7B',
      dark: '#222222',
    },
    text: {
      primary: '#222222',
      secondary: '#7B7B7B',
    }
  },
  typography: {
    fontFamily: 'Montserrat',
    body1: {
      fontSize: '14px',
      color: 'secondary.main'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '2.6rem',
        },
        input: {
          padding: '1rem 1.1rem',
          fontStyle: 'italic',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: '2.6rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.light,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: theme.palette.primary.main,
          borderRadius: '2.6rem',
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          }
        }),
      },
    },
  },
});