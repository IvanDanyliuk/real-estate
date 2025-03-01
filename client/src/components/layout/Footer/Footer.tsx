import { Link } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import { SocialMediaLinks } from "../SocialMediaLinks/SocialMediaList";
import logo from "../../../assets/images/logo_secondary.svg"
import { NAV_LINKS, SUPPORT_LINKS } from "../../../utils/constants";
import { styles } from "./styles";

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={styles.component}>
      <Container sx={styles.container}>
        <Box sx={styles.column}>
          <Link to="/">
            <Box component="img" src={logo} alt="logo" />
          </Link>
          <Typography variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Quas, recusandae fugit. Dolorem sit quasi pariatur officiis 
            repudiandae dolorum, quibusdam a recusandae possimus 
            accusantium veritatis delectus, rerum ab culpa architecto 
            tempore debitis quaerat quo accusamus incidunt soluta excepturi 
            voluptatum vel. Quisquam totam quo tempora aliquam veniam, 
            saepe rem, eum aperiam veritatis impedit eos sunt dolore 
            deserunt omnis dicta qui optio, pariatur eligendi. 
          </Typography>
          <SocialMediaLinks />
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h3">
            Pages
          </Typography>
          <Box component="ul" sx={styles.linkList}>
            {NAV_LINKS.map(({ href, label }) => (
              <Box key={crypto.randomUUID()} component="li">
                <Link to={href}>
                  {label}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h3">
            Support
          </Typography>
          <Box component="ul" sx={styles.linkList}>
            {SUPPORT_LINKS.map(({ href, label }) => (
              <Box key={crypto.randomUUID()} component="li">
                <Link to={href}>
                  {label}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={styles.column}>
          <Typography variant="h3">
            Get the latest updates
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};