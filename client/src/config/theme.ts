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
      color: 'secondary.main'
    }
  }
});