import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { PropertyForm } from '../../components/forms/PropertyForm/PropertyForm';

const PropertiesPage = () => {
  

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