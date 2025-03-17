import { Box } from "@mui/material"
import { Header } from "../../components/layout/Header/Header"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Box component='main'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;