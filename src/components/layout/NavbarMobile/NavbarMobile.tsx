import { Box, Button, Drawer } from "@mui/material";
import { useState } from "react";
import { NAV_LINKS } from "../../../utils/constants";
import { Link } from "react-router";
import { styles } from "./styles";
import menuButton from "../../../assets/images/menu.svg";

export const NavbarMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNavbarOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <Button onClick={handleNavbarOpen} sx={styles.menuBtn}>
        <img src={menuButton} alt="menu-button" />
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={handleNavbarOpen}>
        <Box sx={styles.container}>
          <Box component="ul" sx={styles.navLinkList}>
            {NAV_LINKS.map(({ href, label }) => (
              <Box key={crypto.randomUUID()} component="li">
                <Link to={href}>
                  {label}
                </Link>
              </Box>
            ))}
          </Box>
          <Box>
            User Info
          </Box>
        </Box>
      </Drawer>
    </>
  );
};