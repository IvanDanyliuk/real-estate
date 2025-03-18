import { NavLink } from "react-router";
import { Box, List, ListItem, Typography } from "@mui/material";
import { Container } from "../Container/Container";
import { Logo } from "../Logo/Logo";
import { SocialMediaLinks } from "../SocialMediaLinks/SocialMediaLinks";
import { styles } from "./styles";
import { FOOTER_LINKS } from "../../../constants/footerLinks";
import { SubscriptionForm } from "../SubscriptionForm/SubscriptionForm";

const LinkList = ({ links }: { 
  links: { 
    href: string; 
    label: string; 
  }[] 
}) => {
  return (
    <List sx={styles.list}>
      {links.map(({ href, label }) => (
        <ListItem key={crypto.randomUUID()} sx={styles.listItem}>
          <NavLink to={href}>
            {label}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

export const Footer: React.FC = () => {
  return (
    <Container 
      componentType='footer' 
      wrapperStyles={styles.component} 
      contentStyles={styles.container}
    >
      <Box sx={styles.column}>
        <Logo type='light' />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Dolore magni corporis repudiandae fugit veniam saepe 
          necessitatibus ut eos laborum porro. Tenetur, inventore. 
          Blanditiis deserunt cum nesciunt ipsa sed vero facere, et, 
          in, optio minus itaque labore. 
        </Typography>
        <SocialMediaLinks />
      </Box>
      <Box sx={styles.column}>
        <Typography variant='h4'>
          Pages
        </Typography>
        <LinkList links={FOOTER_LINKS.pages} />
      </Box>
      <Box sx={styles.column}>
        <Typography variant='h4'>
          Support
        </Typography>
        <LinkList links={FOOTER_LINKS.support} />
      </Box>
      <Box sx={styles.column}>
        <Typography variant='h4'>
          Get latest updates
        </Typography>
        <SubscriptionForm />
      </Box>
    </Container>
  );
};