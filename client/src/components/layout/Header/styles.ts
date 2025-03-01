export const styles = {
  component: { 
    position: "sticky",
    width: "100%", 
    backgroundColor: "background.default", 
  },
  container: {
    margin: "0 auto",
    padding: {
      xs: "0 1rem",
      sm: 0,
    },
    height: "6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "2.5rem"
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    color: "inherit",
    "a": {
      position: "relative",
      textDecoration: "none",
      fontWeight: 600,
      color: "text.primary",
      paddingBottom: "0.5rem",
      transition: "color 0.2s ease-in-out",
      "&:hover, &.active": {
        color: "primary.main",
      },
      "&::before": {
        position: "absolute",
        content: "''",
        bottom: 0,
        left: 0,
        width: 0,
        height: "3px",
        backgroundColor: "primary.main",
        transition: "all 0.2s ease-in-out",
      },
      "&:hover::before, &.active::before": {
        width: "100%",
        color: "primary.main",
      },
    },
  },
};