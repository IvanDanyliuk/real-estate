import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';


const BlogPage = () => {
  const handleOpenPostForm = () => {

  };

  return (
    <AdminPageContainer 
      heading='Blog' 
      actionBtnTooltip='Create a new post' 
      actionBtnHandler={handleOpenPostForm}
    >
      Blog
    </AdminPageContainer>
  );
};

export default BlogPage;