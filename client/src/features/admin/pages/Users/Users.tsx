import { useSearchParams } from 'react-router-dom';
import { useLazyGetUsersQuery } from '../../../users/state/userApi';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { useEffect } from 'react';
import { User } from '../../../users/state/types';
import { DataTable } from '../../components/DataTable/DataTable';
import { Loader } from '../../../../components/layout/Loader/Loader';

type ColumnType = {
  key: keyof User,
  header: string,
  render?: (item: any) => string,
};

const columns: ColumnType[] = [
  {
    key: '_id',
    header: 'ID',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'phone',
    header: 'Phone',
  },
  {
    key: 'location',
    header: 'Location',
  },
  {
    key: 'createdAt',
    header: 'Creation Date',
  },
];

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const [getUsers, { data, isSuccess }] = useLazyGetUsersQuery();

  useEffect(() => {
    getUsers({
      page: +query.page || 1,
      itemsPerPage: +query.itemsPerPage || 10,
    });
  }, [searchParams, getUsers]);

  return (
    <AdminPageContainer heading='Users'>
      {isSuccess ? (
        <DataTable 
          columns={columns}
          data={data.users}
          count={data.count}
          onDeleteItem={() => {}}
        />
      ) : (
        <Loader />
      )}
    </AdminPageContainer>
  );
};

export default UsersPage;