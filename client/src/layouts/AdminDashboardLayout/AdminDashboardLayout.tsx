import { Box } from "@mui/material"
import { styles } from "./styles"
import { Link, Outlet, useNavigate } from "react-router"
import { Logo } from "../../components/layout/Logo/Logo"
import { useAppSelector } from "../../hooks/useAppSelector"
import { USER_ROLES } from "../../constants/main"


export const AdminDashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  if(!user || user && user.role !== USER_ROLES.Admin) {
    navigate('/', { replace: true });
  }

  return (
    <Box sx={styles.component}>
      <Box component='header' sx={styles.header}>
        <Logo />
        <Link to='/'>Go back</Link>
      </Box>
      <Outlet />
    </Box>
  );
};