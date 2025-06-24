import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../../../components/layout/Container/Container';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { MaterialsList } from '../../components/MaterialsList/MaterialsList';
import { useLazyGetPostsQuery } from '../../state/blogApi';
import { styles } from './styles';


const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const [getPosts, { data, isLoading, isSuccess, isError }] = useLazyGetPostsQuery();

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  useEffect(() => {
    getPosts({ page, itemsPerPage });
  }, [page, itemsPerPage, getPosts]);

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