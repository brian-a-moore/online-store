import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse } from '../../../../api/src/types/api';
import { Card, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ListUser = ListUsersAdminResponse['users'][0];

export const UsersAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListUsersAdminBody, ListUsersAdminQuery, ListUsersAdminResponse>({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const getColumns = (user: ListUser) => {
    const keys = Object.keys(user);
    return keys.map((key) => {
      return {
        key,
        label: key,
      };
    });
  };

  if (isLoading) return <Loader />;

  const users = response?.users;

  return (
    <Page>
      <Container>
        <Card className='!flex-row items-center justify-between'>
          <H4>Users</H4>
          <Button title='New User'>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {users && users.length ? (<Table columns={getColumns(users[0])} data={users} />) : <EmptyText>No users found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
