import { Link } from "react-router";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { NAV_LINKS } from "../../../utils/constants";
import logo from "../../../assets/images/logo_primary.svg";
import { styles } from "./styles.ts";
import { NavbarMobile } from "../NavbarMobile/NavbarMobile.tsx";

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
                    <Link to={link.href}>
                      {link.label}
                    </Link>
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