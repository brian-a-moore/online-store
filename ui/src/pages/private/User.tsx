import { mdiAccountCircle, mdiAccountEdit, mdiAccountPlus, mdiSecurity, mdiStorefront } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetUserBody, GetUserQuery, GetUserResponse, ListUsersBody, ListUsersQuery, ListUsersResponse } from '../../../../api/src/types/api';
import Loader from '../../components/core/Loader';
import { Button, FloatingActionButton, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

export const UserHome: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetUserBody, GetUserQuery, GetUserResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.GET
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const user = response?.user;

  return (
    <div>
      <H2>{user!.name}</H2>
      <Link href="edit">Edit User</Link>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <FloatingActionButton onClick={() => navigate('edit', { state: { user }})} path={mdiAccountEdit} label='Edit User' />
    </div>
  );
};

type UserState = {
    id: string;
    email: string;
    name: string;
    isSuperUser: boolean;
    createdAt: Date;
    updatedAt: Date;
    stores: {
        storeId: string | null;
        roleId: number;
        store: {
            name: string;
            id: string;
        } | null;
    }[];
}

export const UserEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user: UserState | undefined = location.state?.user;

  console.log({ location });

  return (
    <div>
      <H2>{user?.id ? 'Edit' : 'New'} User</H2>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

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
    <div className='w-full p-4'>
      <div className='flex flex-col w-full max-w-[960px] mx-auto gap-4'>
        {users?.map((user) => (
          <RouterLink className='flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md' key={user.id} to={`../user/${user.id}`} title={`View user: ${user.name}`}>
              <p className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>{user.name}</p>
              <p className='text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden'>{user.email}</p>
              <Icon path={user.isSuperUser ? mdiSecurity : mdiAccountCircle} size={0.75} title={user.isSuperUser ? 'Super User' : 'Standard User'} />
              <div className='flex gap-2 items-center'>
                <Icon className='opacity-60' path={mdiStorefront} size={0.75} />
                <p className='flex items-center bg-orange-400 text-white text-sm px-2 rounded'>{user.stores.length}</p>
              </div>
          </RouterLink>
        ))}
      </div>
      <FloatingActionButton path={mdiAccountPlus} label='New User' onClick={() => navigate('../user/new')} />
    </div>
  );
};
