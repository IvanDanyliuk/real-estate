import { Link, NavLink } from "react-router";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { NavbarMobile } from "../NavbarMobile/NavbarMobile.tsx";
import { NAV_LINKS } from "../../../utils/constants";
import logo from "../../../assets/images/logo_primary.svg";
import { styles } from "./styles.ts";

export const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box component="header" sx={styles.component}>
      <Container sx={styles.container}>
        <Link to="/">
          <Box component="img" src={logo} alt="logo" sx={styles.logo} />
        </Link>
        {isMobile ? (
          <NavbarMobile />
        ) : (
          <>
            <nav>
              <Box component="ul" sx={styles.navLinks}>
                {NAV_LINKS.map(link => (
                  <Box key={crypto.randomUUID()} component="li">
                    <NavLink to={link.href}>
                      {link.label}
                    </NavLink>
                  </Box>
                ))}
              </Box>
            </nav>
            <div>
              Auth
            </div>
          </>
        )}
      </Container>
    </Box>
  );
};