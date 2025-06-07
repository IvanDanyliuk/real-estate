import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useCreatePropertyMutation, useLazyGetPropertiesQuery } from '../../../properties/state/propertyApi';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { SectionSkeleton } from '../../../../components/layout/skeletons/SectionSkeleton/SectionSkeleton';
import { PropertyForm } from '../../../admin/components/forms/PropertyForm/PropertyForm';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { statusToast } from '../../../../components/toast/toast';
import { PropertyList } from '../../../properties/components/PropertyList/PropertyList';
import { MARKET_TYPE } from '../../../../constants/main';
import { styles } from './styles';


const propertyFormInitialData = {
  title: '',
  price: 0,
  location: {
    region: '',
    city: '',
    address: '',
    mapCoords: { 
      lat: 48.3794, 
      lng: 31.1656 
    },
  },
  type: '',
  market: MARKET_TYPE.Secondary,
  description: '',
  images: [],
  overview: {
    roomsNumber: 0,
    propertyType: '',
    yearBuilt: new Date().getFullYear(),
    floor: 0,
    numberOfFloors: 1,
    area: 0,
    withRenovation: 'yes',
  },
  nearbyAmenities: [],
};


const MyPropertiesPage = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [propertyFormOpen, setPropertyFormOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const { user } = useAppSelector(state => state.user);
  
  const [getProperties, { data, isSuccess, isLoading }] = useLazyGetPropertiesQuery();
  const [createProperty, { isSuccess: isCreateSuccess }] = useCreatePropertyMutation();

  const handlePropertyFormOpen = () => {
    setPropertyFormOpen(!propertyFormOpen);
  };

  const handleCreateNewProperty = useCallback(async (propertyData: FormData) => {
    const { data, error } = await createProperty(propertyData);
    
    if(data) {
      setPropertyFormOpen(false);
    }

    if(data && data.payload) {
      statusToast({ 
        type: 'success', 
        message: data.message 
      });
    }
    if(error) {
      statusToast({
        type: 'error',
        message: t('admin_dashboard.properties_page.propertyForm.status.createFailed'),
      });
    }
  }, [createProperty]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  useEffect(() => {
    if(user) {
      getProperties({
        page: +query.page || 1,
        itemsPerPage: +query.itemsPerPage || 8,
        userId: user._id
      });
    }
  }, [searchParams, isSuccess]);

  if(!user) {
    return (
      <Box sx={styles.skeleton} data-testid='skeleton'>
        <SectionSkeleton numberOfItems={4} />
        <SectionSkeleton numberOfItems={4} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Tooltip title={t('Create a new property')}>
        <IconButton sx={styles.createPropertyBtn}>
          <Add />
        </IconButton>
      </Tooltip>
      {isSuccess ? (
        <>
          <PropertyList 
            data={data.properties} 
            userId={user._id} 
          />
          <ListPagination count={data.count} />
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div>No properties found</div>
          )}
        </>
      )}
      <PropertyForm 
        open={propertyFormOpen} 
        title='Create a new property' 
        initialData={propertyFormInitialData}
        onClose={handlePropertyFormOpen} 
        onSubmit={handleCreateNewProperty} 
      />
    </Box>
  );
};

export default MyPropertiesPage;