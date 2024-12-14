import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListUsersAdminBody,
  ListUsersAdminQuery,
  ListUsersAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid } from '../../components/container';
import { UserAdminForm } from '../../components/form/admin/User';
import { EmptyText } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

type Row = ListUsersAdminResponse['users'][0];

const columns: ColDef[] = [
  { field: 'id', hide: true },
  {
    field: 'name',
    headerName: 'User Name',
    filter: true,
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Email',
    filter: true,
    flex: 2,
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

export const UsersAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListUsersAdminBody,
    ListUsersAdminQuery,
    ListUsersAdminResponse
  >(
    {
      url: `/admin/user/list`,
      method: HTTP_METHOD.GET,
      params: { page: page.toString(), search: '', searchKey: 'name' },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openNewUserForm = () =>
    openModal(<UserAdminForm forceReload={forceReload} />);
  const openEditUserForm = (id: string) =>
    openModal(<UserAdminForm userId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditUserForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const users = response?.users;

  return (
    <>
      {users && users.length ? (
        <AgGrid<Row> cols={columns} rows={users} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText>No users found</EmptyText>
      )}
    </>
  );
};
