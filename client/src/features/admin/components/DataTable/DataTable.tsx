import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead, 
  TablePagination, 
  TableRow, 
  TableSortLabel
} from '@mui/material';

type TableProps<T extends { _id: string }> = {
  data: T[],
  count: number,
  columns: {
    key: keyof T,
    header: string,
    isSortable?: boolean,
    render?: (item: T) => ReactNode,
  }[],
};

type OrderDirection = 'asc' | 'desc';

const itemsPerPageOptions = [10, 15, 20];

export const DataTable = <T extends { _id: string }>({ data, count, columns }: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('desc');  

  const handleSortColumn = (property: string) => {
    const isDesc = property && orderDirection === 'desc';
    setOrderDirection(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    searchParams.set('orderBy', property);
    searchParams.set('order', isDesc ? 'asc' : 'desc');
    setSearchParams(searchParams);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(0);
    searchParams.set('page', '1');
    searchParams.set('itemsPerPage', parseInt(e.target.value, 10).toString())
    setSearchParams(searchParams);
  };

  const handlePageChange = (
    e: MouseEvent<HTMLButtonElement> | null, 
    newPage: number
  ) => {
    setPage(newPage);
    searchParams.set('page', `${newPage + 1}`)
    setSearchParams(searchParams);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ key, header, isSortable }) => (
                <TableCell key={key.toString()}>
                  {isSortable ? (
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? orderDirection : 'desc'}
                      onClick={() => handleSortColumn(key.toString())}
                    >
                      {header}
                    </TableSortLabel>
                  ) : <span>{header}</span>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item._id}>
                {columns.map(({ key, render }, i) => (
                  <TableCell key={`${item._id}-${i}`}>
                    {render ? render(item) : `${item[key as keyof T]}`}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
        component='div'
        count={count}
        page={page}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={itemsPerPageOptions}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};