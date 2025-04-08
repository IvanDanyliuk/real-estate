import { ChangeEvent, useState } from 'react';
import { 
  Box, Button, IconButton, List, ListItem, 
  MenuItem, Select, TextField, Typography 
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput } from '../../../../../components/inputs/FileInput/FileInput';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { PropertyDataType, propertySchema } from '../../../data-models';
import { removeFalseyFields } from '../../../../../utils/helpers';
import { AD_TYPES, PROPERTY_TYPES } from '../../../../../constants/main';
import { styles } from './styles';


interface PropertyInitialData extends PropertyDataType {
  _id?: string;
};
interface PropertyFormProps {
  onSubmit: (data: FormData) => Promise<any>;
  initialData: PropertyInitialData;
};

const amenityInitialValue = {
  object: '',
  distanceTo: 0,
};


export const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [amenity, setAmenity] = useState(amenityInitialValue);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    reset,
  } = useForm<PropertyDataType>({
    defaultValues: initialData,
    resolver: zodResolver(propertySchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nearbyAmenities',
  });

  const handleAmenityChange = (e: ChangeEvent<HTMLInputElement>) => {
      setAmenity({ 
        ...amenity, 
        [e.target.name]: e.target.name === 'distanceTo' 
          ? +e.target.value 
          : e.target.value 
      });
    };
  
  const handleAddAmenity = () => {
    if(amenity.object.trim() !== '' && amenity.distanceTo >= 0) {
      append(amenity);
      setAmenity(amenityInitialValue);
    }
  };

  const onHandleSubmit: SubmitHandler<PropertyDataType> = async (propertyData) => {
    const formData = new FormData();
    formData.append('title', propertyData.title);
    formData.append('price', +propertyData.price as any);
    formData.append('location', JSON.stringify(removeFalseyFields({
      city: propertyData.location.city,
      address: propertyData.location.address,
      mapCoords: propertyData.location.mapCoords && propertyData.location.mapCoords.lat && propertyData.location.mapCoords.lng 
        ? {
          lat: propertyData.location.mapCoords.lat,
          lng: propertyData.location.mapCoords.lng,
        } 
        : undefined,
    })));
    formData.append('adType', propertyData.adType);
    if(user) formData.append('author', user._id);
    formData.append('description', propertyData.description);
    if(propertyData.images) {
      for(const image of propertyData.images) {
        formData.append('images', image);
      }
    }
    formData.append('overview', JSON.stringify(removeFalseyFields({
      roomsNumber: propertyData.overview.roomsNumber,
      propertyType: propertyData.overview.propertyType,
      yearBuilt: propertyData.overview.yearBuilt,
      floor: propertyData.overview.floor,
      numberOfFloors: propertyData.overview.numberOfFloors,
      area: propertyData.overview.area,
      withRenovation: propertyData.overview.withRenovation,
    })));
    formData.append('nearbyAmenities', JSON.stringify(propertyData.nearbyAmenities));

    await onSubmit(formData);
    reset();
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onHandleSubmit)} sx={styles.form}>
      <Box component='fieldset' sx={styles.fieldset}>
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
          {...register('price', { valueAsNumber: true })} 
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
        <TextField 
          label='Description'
          fullWidth 
          multiline
          rows={11}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description')} 
        />
      </Box>
      <Box component='fieldset' sx={styles.fieldset}>
        <Select
          label='Ad type'
          fullWidth
          error={!!errors.adType}
          {...register('adType')}
        >
          {AD_TYPES.map(({ value, label }, i) => (
            <MenuItem 
              key={`${value}-${i}`} 
              value={value}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
        <Select
          label='Property type'
          fullWidth
          error={!!errors.overview?.propertyType}
          {...register('overview.propertyType')}
        >
          {PROPERTY_TYPES.map(({ value, label }, i) => (
            <MenuItem 
              key={`${value}-${i}`} 
              value={value}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
        <TextField 
          label='Rooms number'
          type='number'
          fullWidth 
          error={!!errors.overview?.roomsNumber}
          helperText={errors.overview?.roomsNumber?.message}
          {...register('overview.roomsNumber', { valueAsNumber: true })} 
        />
        <TextField 
          label='Year built'
          type='number'
          fullWidth 
          error={!!errors.overview?.yearBuilt}
          helperText={errors.overview?.yearBuilt?.message}
          {...register('overview.yearBuilt', { valueAsNumber: true })} 
        />
        <TextField 
          label='Floor'
          type='number'
          fullWidth 
          error={!!errors.overview?.floor}
          helperText={errors.overview?.floor?.message}
          {...register('overview.floor', { valueAsNumber: true })} 
        />
        <TextField 
          label='Number of floors'
          type='number'
          fullWidth 
          error={!!errors.overview?.numberOfFloors}
          helperText={errors.overview?.numberOfFloors?.message}
          {...register('overview.numberOfFloors', { valueAsNumber: true })} 
        />
        <TextField 
          label='Area'
          type='number'
          fullWidth 
          error={!!errors.overview?.area}
          helperText={errors.overview?.area?.message}
          {...register('overview.area', { valueAsNumber: true })} 
        />
        <Select
          label='With renovation'
          fullWidth
          defaultValue='yes'
          error={!!errors.overview?.withRenovation}
          {...register('overview.withRenovation')}
        >
          <MenuItem 
            value='yes'
          >
            Yes
          </MenuItem>
          <MenuItem 
            value='no'
          >
            No
          </MenuItem>
        </Select>
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
      </Box>
      <Box component='fieldset' sx={styles.fieldset}>
        <Typography variant='h6'>
          Nearby amenities
        </Typography>
        <TextField 
          name='object'
          label='Object name'
          fullWidth 
          value={amenity.object}
          onChange={handleAmenityChange}
        />
        <TextField 
          name='distanceTo'
          label='Distance to object'
          fullWidth 
          value={amenity.distanceTo}
          onChange={handleAmenityChange}
        />
        <Button type='button' onClick={handleAddAmenity}>
          Add a new amenity
        </Button>
        <List sx={styles.amenitiesList}>
          {fields.map((field, index) => (
            <ListItem key={`${field}-${index}`} sx={styles.amenitiesListItem}>
              <Typography>
                {`${field.object} - ${field.distanceTo}m`}
              </Typography>
              <IconButton onClick={() => remove(index)}>
                <Close />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={styles.submitBtnContainer}>
        <Button type='submit' disabled={isSubmitting} sx={styles.submitBtn}>
          {isSubmitting ? 'Loading...' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};