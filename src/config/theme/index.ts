import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
    },
  },
  typography: {
    fontFamily: "'Montserrat, sans-serif",
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
    }
  }
});

export default theme;