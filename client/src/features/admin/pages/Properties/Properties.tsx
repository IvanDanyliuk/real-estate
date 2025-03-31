import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';

const PropertiesPage = () => {
  const handleOpenPropertyForm = () => {

  };

  return (
    <AdminPageContainer 
      heading='Properties' 
      actionBtnTooltip='Create a new property' 
      actionBtnHandler={handleOpenPropertyForm}
    >
      Properties
    </AdminPageContainer>
  );
};

export default PropertiesPage;