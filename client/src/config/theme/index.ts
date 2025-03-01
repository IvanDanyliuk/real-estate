import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1200,
      lg: 1439,
      xl: 1900,
    },
  },
  palette: {
    primary: {
      main: "#40B5F9",
      dark: "#0B9EF3",
    },
    secondary: {
      main: "#EEEEEE",
      dark: "#7B7B7B",
    },
    background: {
      default: "#FFFFFF",
      paper: "#222222",
    },
    text: {
      primary: "#222222",
      secondary: "#7B7B7B",
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "0.8rem",
    }
  }
});

export default theme;