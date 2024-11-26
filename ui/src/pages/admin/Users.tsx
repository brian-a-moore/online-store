import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { UserAdminForm } from '../../components/form/admin/User';
import { Button } from '../../components/interactive';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
  label: 'User Name',
  render: (value) => <p>{value}</p>,
},{
  key: 'email',
  label: 'Email',
  render: (value) => <p>{value}</p>,
}, {
  key: 'createdAt',
  label: 'Created Date',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}, {
  key: 'updatedAt',
  label: 'Last Updated',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}];

export const UsersAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();

  const { error, isLoading, response } = useApi<ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse>({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  }, { reTrigger: reload });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openNewUserForm = () => openModal(<UserAdminForm forceReload={forceReload} />);
  const openEditUserForm = (id: string) => openModal(<UserAdminForm userId={id} forceReload={forceReload} />);

  if (isLoading) return <Loader />;

  const users = response?.users;

  return (
    <Page>
      <Container>
        <Card className='!flex-row items-center justify-between'>
          <H4>Users</H4>
          <Button title='New User' onClick={openNewUserForm}>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {users && users.length ? (<Table columns={columns} data={users} onRowClick={openEditUserForm} />) : <EmptyText>No users found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
