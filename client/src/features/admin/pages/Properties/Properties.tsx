import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useGetPropertiesQuery } from '../../../properties/state/propertyApi';

const columns = [
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
    key: 'location.city',
    header: 'City',
    render: (item: any) => item.location.city,
  },
  {
    key: 'location.address',
    header: 'Address',
    render: (item: any) => item.location.address,
  },
  {
    key: 'author.name',
    header: 'Author',
    render: (item: any) => item.author.name,
  },
  {
    key: 'overview.propertyType',
    header: 'Type',
    render: (item: any) => item.overview.propertyType,
  },
];

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const { data, isSuccess } = useGetPropertiesQuery({
    page: +query.page || 1,
    itemsPerPage: +query.itemsPerPage || 10,
    ...query,
  });

  return (
    <AdminPageContainer 
      heading='Properties' 
      actionComponent={<PropertyForm />} 
    >
      {isSuccess ? (
        <DataTable 
          data={data.properties} 
          count={data.count} 
          columns={columns} 
        />
      ): (
        <Loader />
      )}
    </AdminPageContainer>
  );
};

export default PropertiesPage;