import { Box } from "@mui/material"
import { Header } from "../../components/layout/Header/Header"
import { Outlet } from "react-router"
import { Footer } from "../../components/layout/Footer/Footer";
import { styles } from "./styles";

const MainLayout = () => {
  return (
    <Box sx={styles.component}>
      <Header />
      <Box component='main' sx={styles.main}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;