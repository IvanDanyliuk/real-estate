import { Box, List, ListItem, Tooltip } from "@mui/material"
import { SOCIAL_MEDIA_LINKS } from "../../../constants/socialMediaLinks"
import { Link } from "react-router"
import { styles } from "./styles";

export const SocialMediaLinks: React.FC = () => {
  return (
    <List sx={styles.list}>
      {SOCIAL_MEDIA_LINKS.map(({ href, icon, label }) => (
        <ListItem key={crypto.randomUUID()} sx={styles.listItem}>
          <Link to={href}>
            <Tooltip title={label}>
             <Box 
              component='img' 
              src={icon} 
              alt={label} 
            />
            </Tooltip>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};