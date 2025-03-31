import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';


const BlogPage = () => {
  const handleOpenPostForm = () => {

  };

  return (
    <AdminPageContainer 
      heading='Blog' 
      actionComponent={<div>New post</div>}
    >
      Blog
    </AdminPageContainer>
  );
};

export default BlogPage;