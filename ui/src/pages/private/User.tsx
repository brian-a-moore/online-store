import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { GetUserBody, GetUserQuery, GetUserResponse, ListUsersBody, ListUsersQuery, ListUsersResponse } from '../../../../api/src/types/api';
import { Card } from '../../components/container';
import { Button, ButtonLink, Link } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type UserHomeProps = {};

export const UserHome: React.FC<UserHomeProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetUserBody, GetUserQuery, GetUserResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.GET
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const user = response?.user;

  return (
    <div>
      <h1>{user!.name}</h1>
      <Link href="edit">Edit User</Link>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

type UserEditProps = {};

export const UserEdit: React.FC<UserEditProps> = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit User</h1>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

type UserListProps = {};

export const UserList: React.FC<UserListProps> = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListUsersBody, ListUsersQuery, ListUsersResponse>({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const users = response?.users;

  return (
    <div>
      <ButtonLink href="../user/new">New User</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {users?.map((user: any) => (
          <RouterLink key={user.id} to={`../user/${user.id}`}>
            <Card>
              <p>{user.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
