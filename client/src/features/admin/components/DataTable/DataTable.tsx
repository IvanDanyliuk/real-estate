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
import { ReactNode } from 'react';

type TableProps<T> = {
  data: T[],
  count: number,
  columns: {
    key: keyof T,
    header: string,
    isSortable?: boolean,
    render?: (item: T) => ReactNode,
  }[],
}

export const DataTable = <T,>({ data, count, columns }: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('TABLE SEARCH PARAMS', searchParams)

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
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[10, 15, 20]}
        onPageChange={() => {}}
      />
    </Paper>
  );
};