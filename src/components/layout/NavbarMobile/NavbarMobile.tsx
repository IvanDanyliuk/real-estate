import { useState } from "react";
import { NavLink } from "react-router";
import { Box, Button, Drawer } from "@mui/material";
import { NAV_LINKS } from "../../../utils/constants";
import menuButton from "../../../assets/images/menu.svg";
import { styles } from "./styles";
import { SocialMediaLinks } from "../SocialMediaLinks/SocialMediaList";

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
          <Box>
            User Info
          </Box>
          <Box component="ul" sx={styles.navLinkList}>
            {NAV_LINKS.map(({ href, label }) => (
              <Box key={crypto.randomUUID()} component="li">
                <NavLink to={href}>
                  {label}
                </NavLink>
              </Box>
            ))}
          </Box>
          <SocialMediaLinks />
        </Box>
      </Drawer>
    </>
  );
};