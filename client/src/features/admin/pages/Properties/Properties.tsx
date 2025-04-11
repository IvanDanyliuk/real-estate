import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { statusToast } from '../../../../components/toast/toast';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';
import { 
  useCreatePropertyMutation, useDeletePropertyMutation, 
  useLazyGetPropertiesQuery, useUpdatePropertyMutation 
} from '../../../properties/state/propertyApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { addProperty, setProperties, updateProperty } from '../../../properties/state/propertySlice';
import { PropertyType } from '../../../properties/state/types';
import { PropertyDataType } from '../../data-models';
import { styles } from './styles';


type ColumnType = {
  key: keyof PropertyType,
  header: string,
  isSortable?: boolean,
  render?: (item: any) => string,
};

const columns: ColumnType[] = [
  {
    key: '_id',
    header: 'ID',
  },
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'price',
    header: 'Price',
    isSortable: true,
  },
  {
    key: 'location.city' as keyof PropertyType,
    header: 'City',
    render: (item: any) => item.location.city,
  },
  {
    key: 'location.address' as keyof PropertyType,
    header: 'Address',
    render: (item: any) => item.location.address,
  },
  {
    key: 'author.name' as keyof PropertyType,
    header: 'Author',
    render: (item: any) => item.author.name,
  },
  {
    key: 'overview.propertyType' as keyof PropertyType,
    header: 'Type',
    render: (item: any) => item.overview.propertyType,
  },
];

const newPropertyEmptyState: PropertyDataType = {
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
  type: '',
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


const PropertiesPage = () => {
  const [propertyFormOpen, setPropertyFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'create' | 'update'>('create');
  const [propertyFormInitialState, setPropertyFormInitialState] = useState<any>(newPropertyEmptyState);

  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.properties);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [getProperties, { data, isSuccess }] = useLazyGetPropertiesQuery();
  const [createProperty] = useCreatePropertyMutation();
  const [updateExistingProperty] = useUpdatePropertyMutation();
  const [deleteProperty, { isSuccess: isDeleteSuccess }] = useDeletePropertyMutation();

  const handleNewPropertyFormOpen = () => {
    setFormMode('create');
    setPropertyFormInitialState(newPropertyEmptyState);
    setPropertyFormOpen(!propertyFormOpen);
  };

  const handleCreateProperty = useCallback(async (propertyData: FormData) => {
    const { data, error } = await createProperty(propertyData);
    
    if(data) {
      dispatch(addProperty(data.payload));
      setPropertyFormOpen(false);
      setPropertyFormInitialState(newPropertyEmptyState);
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
        message: 'Failed to create a new property',
      });
    }
  }, [createProperty, dispatch]);

  const handleUpdateProperty = useCallback(async (propertyData: FormData) => {
    const { data, error } = await updateExistingProperty(propertyData);

    if(data) {
      console.log('UPDATE PROPERTY', data.payload)
      dispatch(updateProperty(data.payload));
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
        message: 'Failed to create a new property',
      });
    }
  }, []);

  const handleSetPropertyToUpdate = useCallback((property: any) => {
    setFormMode('update');
    setPropertyFormOpen(true);
    setPropertyFormInitialState(property);
  }, []);

  const handlePropertyDelete = useCallback(async (id: string) => {
    await deleteProperty(id);
  }, [deleteProperty]);

  useEffect(() => {
    getProperties({
      page: +query.page || 1,
      itemsPerPage: +query.itemsPerPage || 10,
      ...query,
    });
  }, [searchParams, isDeleteSuccess])

  useEffect(() => {
    if(data && data.properties) {
      dispatch(setProperties(data.properties));
    }
  }, [isSuccess, dispatch, searchParams, data]);

  return (
    <AdminPageContainer 
      heading='Properties'
      actionBtnTooltipText='Create a new property' 
      action={handleNewPropertyFormOpen} 
    >
      {isSuccess || isDeleteSuccess ? (
        <DataTable 
          data={properties} 
          count={data.count} 
          columns={columns} 
          onUpdateItem={handleSetPropertyToUpdate}
          onDeleteItem={handlePropertyDelete}
        />
      ): (
        <Loader />
      )}
      <PropertyForm 
        open={propertyFormOpen} 
        title='Property' 
        initialData={propertyFormInitialState} 
        onClose={() => setPropertyFormOpen(false)} 
        onSubmit={formMode === 'create' ? handleCreateProperty : handleUpdateProperty} 
      />
    </AdminPageContainer>
  );
};

export default PropertiesPage;