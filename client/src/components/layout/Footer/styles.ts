export const styles = {
  component: {
    width: "100%", 
    backgroundColor: "background.paper",
  },
  container: {
    margin: "0 auto",
    padding: {
      xs: "2rem 1rem",
      sm: "2rem 0",
    },
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    flexWrap: {
      xs: "no-wrap",
      sm: "wrap",
    },
    justifyContent: {
      xs: "start",
      sm: "space-between",
    },
    gap: "2rem",
  },
  column: {
    maxWidth: {
      xs: "100%",
      sm: "50%",
      md: "25%",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: {
      xs: "center",
      sm: "start"
    },
    gap: "1.2rem",
    color: "secondary.main",
    "h3": {
      fontSize: "1.4rem",
      textAlign: {
        xs: "center",
        sm: "start",
      },
    },
    "a, p": {
      textAlign: {
        xs: "center",
        sm: "left",
      },
    },
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    "li": {
      textAlign: {
        xs: "center",
        sm: "start",
      },
    },
    "a": {
      fontWeight: 600,
      textDecoration: "none",
      color: "inherit",
    }
  }
};