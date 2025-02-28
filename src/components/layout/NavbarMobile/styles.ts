export const styles = {
  container: {
    padding: "2.5rem 1rem",
    width: "80vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "inherit",
    backgroundColor: "background.default",
  },
  menuBtn: {
    minWidth: "auto",
    width: "2.6rem",
    height: "2.6rem",
    backgroundColor: "primary.main",
    borderRadius: "100%",
    "img": {
      width: "1.4rem",
      height: "1.4rem",
    },
  },
  navLinkList: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    listStyleType: "none",
    "li": {
      textAlign: "center",
    },
    "a": {
      fontSize: "1.3rem",
      fontWeight: 600,
      textDecoration: "none",
      color: "text.primary",
      "&.active": {
        color: "primary.main",
      }
    }
  },
};