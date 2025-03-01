import { Box } from "@mui/material";
import { SOCIAL_MEDIA_LINKS } from "../../../utils/constants";
import { Link } from "react-router";
import { styles } from "./styles";

export const SocialMediaLinks: React.FC = () => {
  return (
    <Box component="ul" sx={styles.component}>
      {SOCIAL_MEDIA_LINKS.map(({ href, icon, label }) => (
        <Box key={crypto.randomUUID()} component="li">
          <Link to={href} target="_blank">
            <Box component="img" src={icon} alt={label} />
          </Link>
        </Box>
      ))}
    </Box>
  );
};