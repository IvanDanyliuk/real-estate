import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { CreatePropertyDialog } from '../../components/CreatePropertyDialog/CreatePropertyDialog';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useDeletePropertyMutation, useLazyGetPropertiesQuery } from '../../../properties/state/propertyApi';
import { setProperties } from '../../../properties/state/propertySlice';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { PropertyType } from '../../../properties/state/types';


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


const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.properties);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [getProperties, { data, isSuccess }] = useLazyGetPropertiesQuery();

  const [deleteProperty, { isSuccess: isDeleteSuccess }] = useDeletePropertyMutation();

  const handlePropertyUpdate = useCallback(async (id: string) => {
    console.log('UPDATE PROPERTY', id)
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
      actionComponent={<CreatePropertyDialog />} 
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