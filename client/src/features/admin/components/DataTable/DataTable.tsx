import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead, 
  TablePagination, 
  TableRow 
} from '@mui/material';

type TableProps<T> = {
  data: T[],
  count: number,
  columns: {
    key: keyof T,
    header: string,
    isSortable?: boolean,
    render?: (item: T) => ReactNode,
  }[],
};

export const DataTable = <T,>({ data, count, columns }: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(0);

  // console.log('TABLE SEARCH PARAMS', Object.fromEntries(searchParams));

  const handlePageChange = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    searchParams.set('page', `${newPage + 1}`)
    setSearchParams(searchParams);
  };

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams);
  //   if(params.page) {
  //     setPage(+params.page);
  //   }
  // }, [searchParams]);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ key, header, isSortable }) => (
                <TableCell key={crypto.randomUUID()}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={crypto.randomUUID()}>
                {columns.map(({ key, render }) => (
                  <TableCell key={crypto.randomUUID()}>
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
        rowsPerPage={10}
        rowsPerPageOptions={[10, 15, 20]}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};