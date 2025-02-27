import { Box, Container, Typography } from "@mui/material";
import { styles } from "./styles";
import logo from "../../../assets/images/logo_secondary.svg"
import { NAV_LINKS, SOCIAL_MEDIA_LINKS, SUPPORT_LINKS } from "../../../utils/constants";
import { Link } from "react-router";

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
            deserunt omnis dicta qui optio, pariatur eligendi. Soluta cum 
            fugiat nisi architecto ex, delectus harum labore veniam 
            voluptate aliquid libero laborum asperiores officiis 
            reprehenderit qui cupiditate atque inventore, natus dignissimos 
            sapiente suscipit! Exercitationem repellat, error hic esse 
            cupiditate nostrum eius expedita, molestias distinctio, 
            est numquam alias?
          </Typography>
          <Box component="ul" sx={styles.sociaMediaLinks}>
            {SOCIAL_MEDIA_LINKS.map(({ href, icon, label }) => (
              <Box key={crypto.randomUUID()} component="li">
                <Link to={href} target="_blank">
                  <Box component="img" src={icon} alt={label} />
                </Link>
              </Box>
            ))}
          </Box>
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