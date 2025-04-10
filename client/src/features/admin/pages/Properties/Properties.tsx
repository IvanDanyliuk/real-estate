import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { CreateEntityDialog } from '../../components/CreateEntityDialog/CreateEntityDialog';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useCreatePropertyMutation, useDeletePropertyMutation, useLazyGetPropertiesQuery } from '../../../properties/state/propertyApi';
import { addProperty, setProperties } from '../../../properties/state/propertySlice';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { PropertyType } from '../../../properties/state/types';
import { statusToast } from '../../../../components/toast/toast';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';
import { PropertyDataType } from '../../data-models';


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

const newPropertyInitialState: PropertyDataType = {
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
  description: '',
  images: undefined,
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
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.properties);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [getProperties, { data, isSuccess }] = useLazyGetPropertiesQuery();
  const [createProperty, { isLoading, isSuccess: isCreateSuccess }] = useCreatePropertyMutation();
  const [deleteProperty, { isSuccess: isDeleteSuccess }] = useDeletePropertyMutation();

  const handleCreateProperty = async (propertyData: FormData) => {
    const { data, error } = await createProperty(propertyData);
    
    if(data) dispatch(addProperty(data.payload));

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
  };

  const handlePropertyUpdate = useCallback(async (id: string) => {
    console.log('UPDATE PROPERTY', id)
  }, []);

  const handlePropertyDelete = useCallback(async (id: string) => {
    await deleteProperty(id);
  }, [deleteProperty]);

  const createNewProperty = (
    <CreateEntityDialog 
      title='Create a new property' 
      tooltipText='Create a new property' 
      isSuccess={isCreateSuccess}
    >
      <PropertyForm 
        initialData={newPropertyInitialState} 
        onSubmit={handleCreateProperty} 
      />
    </CreateEntityDialog>
  )

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
      actionComponent={createNewProperty} 
    >
      {isSuccess || isDeleteSuccess ? (
        <DataTable 
          data={properties} 
          count={data.count} 
          columns={columns} 
          onUpdateItemHandler={handlePropertyUpdate}
          onDeleteItemHandler={handlePropertyDelete}
        />
      ): (
        <Loader />
      )}
    </AdminPageContainer>
  );
};

export default PropertiesPage;