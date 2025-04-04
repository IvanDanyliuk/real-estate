import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';
import { useGetPropertiesQuery } from '../../../properties/state/propertyApi';
;

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const { data } = useGetPropertiesQuery({
    page: +query.page || 1,
    itemsPerPage: 10,
    ...query,
  });

  useEffect(() => {
    console.log('PARAMS HAS BEEN CHANGED', query)
  }, [searchParams, query])

  return (
    <AdminPageContainer 
      heading='Properties' 
      actionComponent={<PropertyForm />} 
    >
      Properties
    </AdminPageContainer>
  );
};

export default PropertiesPage;