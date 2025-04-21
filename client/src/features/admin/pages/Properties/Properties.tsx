import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { statusToast } from '../../../../components/toast/toast';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';
import { 
  useCreatePropertyMutation, useDeletePropertyMutation, 
  useLazyGetPropertiesQuery, useUpdatePropertyMutation 
} from '../../../properties/state/propertyApi';
import { PropertyType } from '../../../properties/state/types';
import { PropertyDataType } from '../../components/forms/validationSchemas/property.schema';
import { useTranslation } from 'react-i18next';


type ColumnType = {
  key: keyof PropertyType,
  header: string,
  isSortable?: boolean,
  render?: (item: any) => string,
};

const columns: ColumnType[] = [
  {
    key: '_id',
    header: 'admin_dashboard.properties_page.propertiesTable.columns.id',
  },
  {
    key: 'title',
    header: 'admin_dashboard.properties_page.propertiesTable.columns.title',
  },
  {
    key: 'price',
    header: 'admin_dashboard.properties_page.propertiesTable.columns.price',
    isSortable: true,
  },
  {
    key: 'location.region' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.region',
    render: (item: any) => item.location.region,
  },
  {
    key: 'location.city' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.city',
    render: (item: any) => item.location.city,
  },
  {
    key: 'location.address' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.address',
    render: (item: any) => item.location.address,
  },
  {
    key: 'author.name' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.author',
    render: (item: any) => item.author.name,
  },
  {
    key: 'overview.propertyType' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.type',
    render: (item: any) => item.overview.propertyType,
  },
  {
    key: 'overview.propertyType' as keyof PropertyType,
    header: 'admin_dashboard.properties_page.propertiesTable.columns.market',
    render: (item: any) => item.market,
  },
];

const newPropertyEmptyState: PropertyDataType = {
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
  market: 'secondary',
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
  const { t } = useTranslation()
  const [propertyFormOpen, setPropertyFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'create' | 'update'>('create');
  const [propertyFormInitialState, setPropertyFormInitialState] = useState<any>(newPropertyEmptyState);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [getProperties, { data, isSuccess }] = useLazyGetPropertiesQuery();
  const [createProperty, { isSuccess: isCreateSuccess }] = useCreatePropertyMutation();
  const [updateExistingProperty, { isSuccess: isUpdateSuccess }] = useUpdatePropertyMutation();
  const [deleteProperty, { isSuccess: isDeleteSuccess }] = useDeletePropertyMutation();

  const handleNewPropertyFormOpen = () => {
    setFormMode('create');
    setPropertyFormInitialState(newPropertyEmptyState);
    setPropertyFormOpen(!propertyFormOpen);
  };

  const handleCreateProperty = useCallback(async (propertyData: FormData) => {
    const { data, error } = await createProperty(propertyData);
    
    if(data) {
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
        message: t('admin_dashboard.properties_page.propertyForm.status.createFailed'),
      });
    }
  }, [createProperty]);

  const handleUpdateProperty = useCallback(async (propertyData: FormData) => {
    const { data, error } = await updateExistingProperty(propertyData);

    if(data) {
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
        message: t('admin_dashboard.properties_page.propertyForm.status.updateFailed'),
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
  }, [searchParams, isCreateSuccess, isUpdateSuccess, isDeleteSuccess]);

  return (
    <AdminPageContainer 
      heading={t('admin_dashboard.properties_page.heading')}
      actionBtnTooltipText={t('admin_dashboard.properties_page.addNewPropertyBtnTooltip')} 
      action={handleNewPropertyFormOpen} 
    >
      {isSuccess || isDeleteSuccess ? (
        <DataTable 
          data={data.properties} 
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
        title='admin_dashboard.properties_page.propertyForm.title' 
        initialData={propertyFormInitialState} 
        onClose={() => setPropertyFormOpen(false)} 
        onSubmit={formMode === 'create' ? handleCreateProperty : handleUpdateProperty} 
      />
    </AdminPageContainer>
  );
};

export default PropertiesPage;