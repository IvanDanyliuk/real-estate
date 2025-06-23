import { Box } from '@mui/material';
import { Container } from '../../../../components/layout/Container/Container';
import { useLazyGetPostsQuery } from '../../state/blogApi';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useEffect, useState } from 'react';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { MaterialsList } from '../../components/MaterialsList/MaterialsList';
import { styles } from './styles';

const BlogPage = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const [getPosts, { data, isLoading, isSuccess, isError }] = useLazyGetPostsQuery();

  useEffect(() => {
    getPosts({ page, itemsPerPage });
  }, []);

  if(isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Container contentStyles={styles.container}>
      {isSuccess && (
        <>
          <MaterialsList data={data.articles} />
          <ListPagination count={data.count} />
        </>
      )}
      {isError && (
        <div>Materials not found</div>
      )}
    </Container>
  );
};

export default BlogPage;