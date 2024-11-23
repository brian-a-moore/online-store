import { mdiAccountCircle, mdiPlus, mdiSecurity, mdiStore } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ListUsersBody,
  ListUsersQuery,
  ListUsersResponse
} from '../../../../api/src/types/api';
import { Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { FloatingActionButton } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

export const UserList: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListUsersBody, ListUsersQuery, ListUsersResponse>({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const users = response?.users;

  return (
    <Page>
      <Container>
        {users?.map((user) => (
          <RouterLink
            className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
            key={user.id}
            to={`../user/${user.id}`}
            title={`View user: ${user.name}`}
          >
            <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{user.name}</p>
            <p className="text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden">{user.email}</p>
            <Icon
              path={user.isSuperUser ? mdiSecurity : mdiAccountCircle}
              size={0.75}
              title={user.isSuperUser ? 'Super User' : 'Standard User'}
            />
            <div className="flex gap-2 items-center">
              <Icon className="opacity-60" path={mdiStore} size={0.75} />
              <p className="flex items-center bg-orange-400 text-white text-sm px-2 rounded">{user.stores.length}</p>
            </div>
          </RouterLink>
        ))}
      </Container>
      <FloatingActionButton path={mdiPlus} label="New User" onClick={() => navigate('../user/new')} />
    </Page>
  );
};
