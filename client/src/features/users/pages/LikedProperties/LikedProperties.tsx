import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material'
import { PropertyList } from '../../../properties/components/PropertyList/PropertyList';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useLazyGetLikedPropertiesQuery, useUpdatePropertyMutation } from '../../../properties/state/propertyApi';
import { useUpdateUserMutation } from '../../state/userApi';
import { setUser } from '../../state/userSlice';
import { PropertyType } from '../../../properties/state/types';
import { styles } from './styles';


const LikedPropertiesPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);
  
  const [getLikedProperties, { data, isSuccess }] = useLazyGetLikedPropertiesQuery();
  const [updateExistingProperty, { isSuccess: isUpdatePropertySuccess }] = useUpdatePropertyMutation();
  const [updateUser, { isSuccess: isUpdateUserSuccess }] = useUpdateUserMutation();

  const handleLikeProperty = useCallback(async (property: PropertyType) => {
    if(user) {
      const isPropertyLiked = user.likedProperties.includes(property._id);

      let updatedProperty;
      let updatedUser;

      if(isPropertyLiked) {
        updatedProperty = {
          ...property,
          location: JSON.stringify(property.location),
          overview: JSON.stringify(property.overview),
          nearbyAmenities: JSON.stringify(property.nearbyAmenities),
          likes: property.likes.filter((userId: string) => userId !== user._id)
        };
        const updatedLikeProperties = user.likedProperties.filter(propertyId => propertyId !== property._id);
        updatedUser = {
          ...user,
          likedProperties: updatedLikeProperties
        }
      } else {
        updatedProperty = {
          ...property,
          location: JSON.stringify(property.location),
          overview: JSON.stringify(property.overview),
          nearbyAmenities: JSON.stringify(property.nearbyAmenities),
          likes: [...property.likes, user._id]
        };
        updatedUser = {
          ...user,
          likedProperties: [...user.likedProperties, property._id]
        }
      }
      await updateExistingProperty(updatedProperty);
      const { data, error } = await updateUser(updatedUser);
      if(!error) {
        dispatch(setUser(data.payload));
      }
    }
  }, [updateExistingProperty, updateUser, user]);

  useEffect(() => {
    if(user) {
      getLikedProperties({ 
        page: query.page ? +query.page : 1, 
        itemsPerPage: query.itemsPerPage ? +query.itemsPerPage : 8, 
        userId: user._id 
      });
    }
  }, [getLikedProperties, user]);

  if(!user) {
    return <Loader />;
  }

  return (
    <Box sx={styles.container}>
      {user && isSuccess ? (
        <>
          <PropertyList 
            data={data.properties} 
            userId={user._id}
            onLike={handleLikeProperty}
          />
          <ListPagination count={data.count} />
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default LikedPropertiesPage;