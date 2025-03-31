import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { PropertyFormData } from '../../../../properties/state/types';
import { PropertyDataType, propertySchema } from '../../../data-models';
import { zodResolver } from '@hookform/resolvers/zod';
import { AD_TYPES, PROPERTY_TYPES } from '../../../../../constants/main';
import { FileInput } from '../../../../../components/inputs/FileInput/FileInput';

const initialState: PropertyDataType = {
  title: '',
  price: 0,
  location: {
    city: '',
    address: '',
    mapCoords: {
      lat: 0,
      lng: 0,
    },
  },
  adType: '',
  author: '',
  description: '',
  images: [],
  overview: {
    roomsNumber: 0,
    propertyType: '',
    yearBuilt: new Date().getFullYear(),
    floor: 0,
    numberOfFloors: 1,
    area: 0,
    isRenovated: true,
  },
  nearbyAmenities: [],
};

export const PropertyForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<PropertyDataType>({
    defaultValues: initialState,
    resolver: zodResolver(propertySchema)
  });

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit: SubmitHandler<PropertyDataType> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);

    console.log('PROPERTY FORM DATA', formData);
  };

  return (
    <>
      <Tooltip title='Create a new property'>
        <IconButton onClick={handleMenuOpen} sx={styles.openBtn}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleMenuOpen}>
        <DialogTitle>Create a new property</DialogTitle>
        <DialogContent>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              label='Title'
              fullWidth 
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register('title')} 
            />
            <TextField 
              label='Price'
              type='number'
              fullWidth 
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register('price')} 
            />
            <TextField 
              label='City'
              fullWidth 
              error={!!errors.location?.city}
              helperText={errors.location?.city?.message}
              {...register('location.city')} 
            />
            <TextField 
              label='Address'
              fullWidth 
              error={!!errors.location?.address}
              helperText={errors.location?.address?.message}
              {...register('location.address')} 
            />
            {/* TODO: Add a map to pick the coordinates */}
            <Select
              label='Ad type'
              fullWidth
              error={!!errors.adType}
              {...register('adType')}
            >
              {AD_TYPES.map(({ value, label }) => (
                <MenuItem 
                  key={crypto.randomUUID()} 
                  value={value}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
            <TextField 
              label='Description'
              fullWidth 
              multiline
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description')} 
            />
            <FileInput 
              name='images'
              label='Images'
              title='Upload images'
              register={register}
              setValue={setValue}
              multiple
              error={!!errors.images}
              helperText={errors.images?.message}
            />
            <TextField 
              label='Rooms number'
              type='number'
              fullWidth 
              error={!!errors.overview?.roomsNumber}
              helperText={errors.overview?.roomsNumber?.message}
              {...register('overview.roomsNumber')} 
            />
            <Select
              label='Ad type'
              fullWidth
              error={!!errors.adType}
              {...register('adType')}
            >
              {PROPERTY_TYPES.map(({ value, label }) => (
                <MenuItem 
                  key={crypto.randomUUID()} 
                  value={value}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
            <TextField 
              label='Year built'
              type='number'
              fullWidth 
              error={!!errors.overview?.yearBuilt}
              helperText={errors.overview?.yearBuilt?.message}
              {...register('overview.yearBuilt')} 
            />
            <TextField 
              label='Floor'
              type='number'
              fullWidth 
              error={!!errors.overview?.floor}
              helperText={errors.overview?.floor?.message}
              {...register('overview.floor')} 
            />
            <TextField 
              label='Number of floors'
              type='number'
              fullWidth 
              error={!!errors.overview?.numberOfFloors}
              helperText={errors.overview?.numberOfFloors?.message}
              {...register('overview.numberOfFloors')} 
            />
            <TextField 
              label='Area'
              type='number'
              fullWidth 
              error={!!errors.overview?.area}
              helperText={errors.overview?.area?.message}
              {...register('overview.area')} 
            />
            {/* TODO: Add the isRenovated checkbox */}
            <Box component='fieldset'>
              <Typography variant='h6'>
                Nearby amenities
              </Typography>
              {/* <TextField 
                label='Object name'
                fullWidth 
                error={!!errors.nearbyAmenities}
                helperText={errors.nearbyAmenities?.message}
                {...register('nearbyAmenities')} 
              /> */}
            </Box>
            <Button type='submit'>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};