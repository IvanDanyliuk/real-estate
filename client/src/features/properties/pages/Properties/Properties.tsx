import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Chip, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../../components/layout/Container/Container';
import { PropertyList } from '../../components/PropertyList/PropertyList';
import { ListPagination } from '../../../../components/layout/ListPagination/ListPagination';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { useLazyGetPropertiesQuery } from '../../state/propertyApi';
import { styles } from './styles';
import { Filters } from '../../components/Filters/Filters';


const sortingOptions = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'price',
    label: 'price',
  },
  {
    value: 'area',
    label: 'area',
  },
  {
    value: 'overview.roomsNumber',
    label: 'roomsNumber'
  },
];


const PropertiesPage = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const [getProperties, { data, isSuccess, isLoading }] = useLazyGetPropertiesQuery();

  const handleFilterLabelDelete = (id: string) => {

  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  useEffect(() => {
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
          <Box sx={styles.sortingControls}>
            <Typography>
              Showing 8 of 1,536 results
            </Typography>
            <Select defaultValue={sortingOptions[0].value}>
              {sortingOptions.map(({ value, label }, i) => (
                <MenuItem key={`sorting_option_${i}_${value}`} value={value}>
                  {t(`pages.properties.sortingMenu.${label}`)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Chip 
              label='Apartment' 
              onDelete={() => handleFilterLabelDelete('apartment')} 
              sx={styles.label} 
            />
          </Box>
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