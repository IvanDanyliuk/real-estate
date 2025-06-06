import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { East, West } from '@mui/icons-material';
import { styles } from './styles';


interface ListPaginationProps {
  count: number;
};

const itemsPerPageOptions = [
  {
    label: '8 items per page',
    value: 8,
  },
  {
    label: '16 items per page',
    value: 16,
  },
  {
    label: '20 items per page',
    value: 20,
  },
];


export const ListPagination: React.FC<ListPaginationProps> = ({ count }) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const handleItemsPerPageChange = (e: SelectChangeEvent<number>) => {
    setItemsPerPage(parseInt(e.target.value.toString(), 10));
    setPage(0);
    searchParams.set('page', '1');
    searchParams.set('itemsPerPage', parseInt(e.target.value.toString(), 10).toString())
    setSearchParams(searchParams);
  };

  const handlePageChange = ({
    variant
  }: { variant: 'prev' | 'next' }) => {
    if(variant === 'prev') {
      setPage(page);
      searchParams.set('page', `${page - 1}`);
    } else {
      setPage(page);
      searchParams.set('page', `${page + 1}`);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if(params.page) setPage(+params.page);
    if(params.itemsPerPage) setItemsPerPage(+params.itemsPerPage);
  }, [page, itemsPerPage, searchParams]);

  return (
    <Box sx={styles.footer}>
      <Select defaultValue={8} onChange={handleItemsPerPageChange}>
        {itemsPerPageOptions.map(({ label, value }) => (
          <MenuItem 
            key={`${value}_items_per_page`} 
            value={value}
          >
            {t(label)}
          </MenuItem>
        ))}
      </Select>
      <Box sx={styles.navBtns}>
        <Button 
          disabled={page === 1} 
          onClick={() => handlePageChange({ variant: 'prev' })} 
          sx={styles.navBtn}
        >
          <West />
          Prev
        </Button>
        <Button 
          disabled={page >= Math.round(count / itemsPerPage) + 1} 
          onClick={() => handlePageChange({ variant: 'next' })} 
          sx={styles.navBtn}>
          Next
          <East />
        </Button>
      </Box>
    </Box>
  );
};