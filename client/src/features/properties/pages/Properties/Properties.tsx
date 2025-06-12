import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../../components/layout/Container/Container';
import { PropertyList } from '../../components/PropertyList/PropertyList';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { Filters } from '../../components/Filters/Filters';
import { useLazyGetPropertiesQuery } from '../../state/propertyApi';
import { styles } from './styles';
import { Sorting } from '../../components/Sorting/Sorting';


const PropertiesPage = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [getProperties, { data, isSuccess, isLoading }] = useLazyGetPropertiesQuery();

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  useEffect(() => {
    console.log('SEARCH PARAMS', query)
    const filters = {};
    const sortParams = {};
    
    getProperties({
      page: +query.page || 1,
      itemsPerPage: +query.itemsPerPage || 8,
    });
  }, [searchParams, isSuccess]);

  return (
    <Container contentStyles={styles.container}>
      <Filters />
      <Box sx={styles.main}>
        <Box sx={styles.header}>
          <Typography>
            {`Showing ${page * itemsPerPage} of 1,536 results`}
          </Typography>
          <Sorting />
        </Box>
        <Box sx={styles.properties}>
          {isSuccess ? (
            <>
              <PropertyList 
                data={data.properties} 
              />
              <ListPagination count={data.count} />
            </>
          ) : (
            <Loader />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PropertiesPage;