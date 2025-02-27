export const styles = {
  component: {
    width: "100%", 
    backgroundColor: "background.paper",
  },
  container: {
    margin: "0 auto",
    padding: "2rem 0",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
    },
    gap: "2rem",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    color: "secondary.main",
    "h3": {
      fontSize: "1.5rem",
    }
  },
  sociaMediaLinks: {
    display: "flex",
    gap: "1rem",
    "a": {
      padding: "5px",
      display: "flex",
      backgroundColor: "background.default",
      borderRadius: "100%",
    },
    "img": {
      width: "2rem",
      height: "2rem",
    }
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    "a": {
      fontWeight: 600,
      textDecoration: "none",
      color: "inherit",
    }
  }
};