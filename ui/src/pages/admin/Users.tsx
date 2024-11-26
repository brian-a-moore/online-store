import { mdiDelete, mdiFormTextboxPassword, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H3, H4 } from '../../components/typography';
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
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse>({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openNewUserForm = () => {
    openModal(<>
      <H3>New User</H3>
      <p>Super user form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Create User</Button>
      </div>
    </>);
  };

  const openEditUserForm = (id: string) => {
    openModal(<>
      <div className='flex justify-between'>
        <H3>Edit User</H3>
        <div className='flex gap-4'>
          <Button variant='secondary' title='Delete User' onClick={() => openDeleteUserDialog(id)}>
            <Icon path={mdiDelete} size={0.75} />
          </Button>
          <Button variant='secondary' title='Reset Password' onClick={() => openResetPasswordDialog(id)}>
            <Icon path={mdiFormTextboxPassword} size={0.75} />
          </Button>
        </div>
      </div>
      <p>form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Update User</Button>
      </div>
    </>);
  };

  const openDeleteUserDialog = (id: string) => {
    openModal(<>
      <H3>Delete User</H3>
      <p>Are you sure you want to delete this user?</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='destructive' onClick={closeModal}>Delete User</Button>
      </div>
    </>);
  };

  const openResetPasswordDialog = (id: string) => {
    openModal(<>
      <H3>Reset Password</H3>
      <p>Are you sure you want to reset this user's password?</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Reset Password</Button>
      </div>
    </>);
  };

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
