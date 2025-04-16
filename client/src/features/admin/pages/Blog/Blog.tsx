import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { PostForm } from '../../components/forms/PostForm/PostForm';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useCreatePostMutation, useDeletePostMutation, useLazyGetPostsQuery, useUpdatePostMutation } from '../../../blog/state/blogApi';
import { statusToast } from '../../../../components/toast/toast';

const newPostEmptyState = {
  title: '',
  content: '',
  images: [],
};

const BlogPage = () => {
  const [postFormOpen, setPostFormOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'create' | 'update'>('create');
  const [postFormInitialState, setPostFormInitialState] = useState<any>(newPostEmptyState);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);
  
  const [getPosts, { data, isSuccess }] = useLazyGetPostsQuery();
  const [createPost, { isSuccess: createPostSuccess }] = useCreatePostMutation();
  const [updatePost, { isSuccess: updatePostSuccess }] = useUpdatePostMutation();
  const [deletePost, { isSuccess: deletePostSuccess }] = useDeletePostMutation();

  const handleNewPostFormOpen = () => {
    setFormMode('create');
    setPostFormInitialState(newPostEmptyState);
    setPostFormOpen(!postFormOpen);
  };

  const handleCreateNewPost = useCallback(async (postData: FormData) => {
    const { data, error } = await createPost(postData);

    if(data && data.payload) {
      setPostFormOpen(false);
      setPostFormInitialState(newPostEmptyState);
      statusToast({ 
        type: 'success', 
        message: data.message 
      });
    }

    if(error) {
      statusToast({
        type: 'error',
        message: 'Failed to create a new post',
      });
    }
  }, [createPost]);

  const handleSetPostToUpdate = useCallback((post: any) => {
    setFormMode('update');
    setPostFormOpen(true);
    setPostFormInitialState(post);
  }, []);

  useEffect(() => {
    getPosts({
      page: +query.page || 1,
      itemsPerPage: +query.itemsPerPage || 10,
    });
  }, [searchParams, createPostSuccess, updatePostSuccess, deletePostSuccess]);

  return (
    <AdminPageContainer 
      heading='Create a new article'
      actionBtnTooltipText='Create a new article'
      action={handleNewPostFormOpen}
    >
      {isSuccess || deletePostSuccess ? (
        <div>Data will be here...</div>
      ) : (
        <Loader />
      )}
      <PostForm 
        open={postFormOpen}
        title='Post'
        initialData={postFormInitialState}
        onClose={handleNewPostFormOpen}
        onSubmit={handleCreateNewPost}
      />
    </AdminPageContainer>
  );
};

export default BlogPage;