import { ChangeEvent, useEffect, useState } from 'react';
import { 
  Box, Button, Dialog, DialogContent, DialogTitle, IconButton, 
  List, ListItem, MenuItem, Select, TextField, Typography 
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput } from '../../../../../components/inputs/FileInput/FileInput';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { PropertyDataType, propertySchema } from '../validationSchemas/property.schema';
import { removeFalseyFields } from '../../../../../utils/helpers';
import { AD_TYPES, PROPERTY_TYPES } from '../../../../../constants/main';
import { MapInput } from '../../../../../components/inputs/MapInput/MapInput';
import { REGIONS } from '../../../../../constants/geoData';
import { styles } from './styles';


interface PropertyInitialData extends PropertyDataType {
  _id?: string;
};
interface PropertyFormProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<any>;
  initialData: PropertyInitialData;
};

const amenityInitialValue = {
  object: '',
  distanceTo: 0,
};


export const PropertyForm: React.FC<PropertyFormProps> = ({ 
  open, 
  title, 
  onClose, 
  initialData, 
  onSubmit 
}) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const [amenity, setAmenity] = useState(amenityInitialValue);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    reset,
    watch,
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
      region: propertyData.location.region,
      city: propertyData.location.city,
      address: propertyData.location.address,
      mapCoords: propertyData.location.mapCoords && propertyData.location.mapCoords.lat && propertyData.location.mapCoords.lng 
        ? {
          lat: propertyData.location.mapCoords.lat,
          lng: propertyData.location.mapCoords.lng,
        } 
        : undefined,
    })));
    formData.append('type', propertyData.type);
    formData.append('market', propertyData.market);
    formData.append('description', propertyData.description);
    formData.append('overview', JSON.stringify(removeFalseyFields({
      roomsNumber: propertyData.overview.roomsNumber,
      propertyType: propertyData.overview.propertyType,
      yearBuilt: propertyData.overview.yearBuilt,
      floor: propertyData.overview.floor,
      numberOfFloors: propertyData.overview.numberOfFloors,
      area: propertyData.overview.area,
      withRenovation: propertyData.overview.withRenovation,
    })));
    formData.append(
      'nearbyAmenities', 
      JSON.stringify(propertyData.nearbyAmenities)
    );

    if(user) {
      formData.append('author', user._id);
    }

    if(propertyData.images) {
      for(const image of propertyData.images) {
        formData.append('images', image);
      }
    }

    if(initialData._id) {
      formData.append('_id', initialData._id);
    }

    await onSubmit(formData);
    reset();
    onClose();
  };

  const propertyCoords = watch('location.mapCoords');

  useEffect(() => {
    if(open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth='xl'
    >
      <DialogTitle sx={styles.dialogHeading}>
        {t(title)}
      </DialogTitle>
      <DialogContent>
        <Box 
          component='form' 
          onSubmit={handleSubmit(onHandleSubmit)} 
          sx={styles.form}
        >
          <Box component='fieldset' sx={styles.fieldset}>
            <TextField 
              data-testid='title'
              label={t('admin_dashboard.properties_page.propertyForm.fields.title.label')}
              fullWidth 
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register('title')} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.price.label')}
              type='number'
              fullWidth 
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register('price', { valueAsNumber: true })} 
            />
            <Select
              label={t('admin_dashboard.properties_page.propertyForm.fields.market.label')}
              fullWidth
              defaultValue={initialData.market}
              error={!!errors.market}
              {...register('market')}
            >
              <MenuItem 
                value='primary'
              >
                {t('admin_dashboard.properties_page.propertyForm.fields.market.values.primary')}
              </MenuItem>
              <MenuItem 
                value='secondary'
              >
                {t('admin_dashboard.properties_page.propertyForm.fields.market.values.secondary')}
              </MenuItem>
            </Select>
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.description.label')}
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
              label={t('admin_dashboard.properties_page.propertyForm.fields.adType.label')}
              fullWidth
              error={!!errors.type}
              defaultValue={initialData.type}
              {...register('type')}
            >
              {AD_TYPES.map(({ value, label }, i) => (
                <MenuItem 
                  key={`${value}-${i}`} 
                  value={value}
                >
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
            <Select
              label={t('admin_dashboard.properties_page.propertyForm.fields.propertyType.label')}
              fullWidth
              defaultValue={initialData.overview.propertyType}
              error={!!errors.overview?.propertyType}
              {...register('overview.propertyType')}
            >
              {PROPERTY_TYPES.map(({ value, label }, i) => (
                <MenuItem 
                  key={`${value}-${i}`} 
                  value={value}
                >
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.roomsNumber.label')}
              type='number'
              fullWidth 
              error={!!errors.overview?.roomsNumber}
              helperText={errors.overview?.roomsNumber?.message}
              {...register('overview.roomsNumber', { valueAsNumber: true })} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.yearBuilt.label')}
              type='number'
              fullWidth 
              error={!!errors.overview?.yearBuilt}
              helperText={errors.overview?.yearBuilt?.message}
              {...register('overview.yearBuilt', { valueAsNumber: true })} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.floor.label')}
              type='number'
              fullWidth 
              error={!!errors.overview?.floor}
              helperText={errors.overview?.floor?.message}
              {...register('overview.floor', { valueAsNumber: true })} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.numberOfFloors.label')}
              type='number'
              fullWidth 
              error={!!errors.overview?.numberOfFloors}
              helperText={errors.overview?.numberOfFloors?.message}
              {...register('overview.numberOfFloors', { valueAsNumber: true })} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.area.label')}
              type='number'
              fullWidth 
              error={!!errors.overview?.area}
              helperText={errors.overview?.area?.message}
              {...register('overview.area', { valueAsNumber: true })} 
            />
            <Select
              label={t('admin_dashboard.properties_page.propertyForm.fields.withRenovation.label')}
              fullWidth
              defaultValue='yes'
              error={!!errors.overview?.withRenovation}
              {...register('overview.withRenovation')}
            >
              <MenuItem 
                value='yes'
              >
                {t('admin_dashboard.properties_page.propertyForm.fields.withRenovation.values.yes')}
              </MenuItem>
              <MenuItem 
                value='no'
              >
                {t('admin_dashboard.properties_page.propertyForm.fields.withRenovation.values.no')}
              </MenuItem>
            </Select>
            <FileInput 
              name='images'
              title={t('admin_dashboard.properties_page.propertyForm.fields.images.label')}
              register={register}
              setValue={setValue}
              multiple
              error={!!errors.images}
              helperText={errors.images?.message}
            />
          </Box>
          <Box component='fieldset' sx={styles.fieldset}>
            <Typography variant='h6'>
              {t('admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.title')}
            </Typography>
            <TextField 
              name='object'
              label={t('admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.label1')}
              fullWidth 
              value={amenity.object}
              onChange={handleAmenityChange}
            />
            <TextField 
              name='distanceTo'
              label={t('admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.label2')}
              fullWidth 
              value={amenity.distanceTo}
              onChange={handleAmenityChange}
            />
            <Button type='button' onClick={handleAddAmenity}>
              {t('admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.addBtnLabel')}
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
          <Box component='fieldset' sx={styles.fieldset}>
            <Select
              data-testid='region-field'
              label={t('admin_dashboard.properties_page.propertyForm.fields.region.label')}
              fullWidth
              defaultValue={initialData.location.region}
              error={!!errors.location?.region}
              {...register('location.region')}
            >
              {REGIONS.map(({ value, label }, i) => (
                <MenuItem 
                  key={`${value}-${i}`} 
                  value={value}
                >
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.city.label')}
              fullWidth 
              error={!!errors.location?.city}
              helperText={errors.location?.city?.message}
              {...register('location.city')} 
            />
            <TextField 
              label={t('admin_dashboard.properties_page.propertyForm.fields.address.label')}
              fullWidth 
              error={!!errors.location?.address}
              helperText={errors.location?.address?.message}
              {...register('location.address')} 
            />
            <MapInput 
              coords={propertyCoords!} 
              onSelectLocation={(coords) => setValue('location.mapCoords', coords)} 
            />
          </Box>
          <Box sx={styles.submitBtnContainer}>
            <Button 
              type='submit' 
              disabled={isSubmitting} 
              sx={styles.submitBtn}
            >
              {isSubmitting 
                ? t('admin_dashboard.properties_page.propertyForm.submitBtn.loading') 
                : t('admin_dashboard.properties_page.propertyForm.submitBtn.default')
              }
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};