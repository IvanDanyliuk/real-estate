import { Box } from "@mui/material"
import { PropertyList } from "../../../properties/components/PropertyList/PropertyList";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { Loader } from "../../../../components/layout/Loader/Loader";
import { styles } from "./styles";

const LikedPropertiesPage = () => {
  const { user } = useAppSelector(state => state.user);
  console.log('LIKED PROPERTIES', user)
  if(!user) {
    return <Loader />;
  }

  return (
    <Box sx={styles.container}>
      <PropertyList data={user.likedProperties} />
    </Box>
  );
};

export default LikedPropertiesPage;