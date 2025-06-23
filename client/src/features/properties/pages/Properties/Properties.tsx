import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Container } from '../../../../components/layout/Container/Container';
import { PropertyList } from '../../components/PropertyList/PropertyList';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { Filters } from '../../components/Filters/Filters';
import { Sorting } from '../../components/Sorting/Sorting';
import { useGetFiltersInitialValuesQuery, useLazyGetPropertiesQuery } from '../../state/propertyApi';
import { styles } from './styles';


const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const [getProperties, { data, isSuccess }] = useLazyGetPropertiesQuery();
  const { data: filtersInitialValues, isSuccess: isFiltersInitialValuesSuccess } = useGetFiltersInitialValuesQuery({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  useEffect(() => {
    const filters: any = {};
    const sortParams: any = {};

    if(query.propertyType) filters['overview.propertyType'] = query.propertyType.split(',');
    if(query.area) filters['overview.area'] = query.area.split(',');
    if(query.market) filters.market = query.market.split(',');
    if(query.location) filters['location.region'] = query.location.split(',');
    if(query.adType) filters.type = query.adType.split(',');
    if(query.price) filters.price = query.price.split(',');

    if(query.orderBy) sortParams.orderBy = query.orderBy;
    
    getProperties({
      page: +query.page || 1,
      itemsPerPage: +query.itemsPerPage || 8,
      filters: JSON.stringify(filters),
      ...query
    });
  }, [searchParams, isSuccess]);

  return (
    <Container contentStyles={styles.container}>
      {isFiltersInitialValuesSuccess ? (
        <Filters initialValues={filtersInitialValues} />
      ) : (
        <Loader />
      )}
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