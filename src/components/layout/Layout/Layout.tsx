import { ReactNode } from "react"
import { Box } from "@mui/material";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { styles } from "./styles";

interface LayoutProps {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  

  return (
    <Box sx={styles.component}>
      <Header />
      <Box component="main" sx={styles.content}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};