import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getUser, getUsers, TUser } from '../../api';
import { Card } from '../../components/container';
import { Button, ButtonLink, Link } from '../../components/interactive';

type UserHomeProps = {};

export const UserHome: React.FC<UserHomeProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        try {
          const { user } = await getUser(userId!);
          if(!user) throw new Error('User not found');
          setUser(user);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchUser();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<TUser[] | null>(null);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        try {
          const { users } = await getUsers();
          setUsers(users);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchUsers();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <ButtonLink href="../user/new">New User</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {users?.map((user) => (
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
