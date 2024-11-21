import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type StoreLayoutProps = {};

export const StoreLayout: React.FC<StoreLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-teal-700 flex gap-4 p-4">
        <Link href=".">About Store</Link>
        <Link href="product/list">View Products</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

type StoreHomeProps = {};

export const StoreHome: React.FC<StoreHomeProps> = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET,
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const store = response?.store;

  return (
    <div>
      <h1>{store!.name}</h1>
      <Link href="edit">Edit Store</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreEditProps = {};

export const StoreEdit: React.FC<StoreEditProps> = () => {
  return (
    <div>
      <h1>Edit Store</h1>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreListProps = {};

export const StoreList: React.FC<StoreListProps> = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: 1 },
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const stores = response?.stores;

  return (
    <div>
      <ButtonLink href="../store/new">New Store</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {stores?.map((store: any) => (
          <RouterLink key={store.id} to={`../store/${store.id}`}>
            <Card>
              <p>{store.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
