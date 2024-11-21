import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse, ListStoresPrivateBody, ListStoresPrivateQuery, ListStoresPrivateResponse } from '../../../../api/src/types/api';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
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

  const { error, isLoading, response } = useApi<GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  const store = response?.store;

  return (
    <div>
      <H2>{store!.name}</H2>
      <Link href="edit">Edit Store</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreEditProps = {};

export const StoreEdit: React.FC<StoreEditProps> = () => {
  return (
    <div>
      <H2>Edit Store</H2>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreListProps = {};

export const StoreList: React.FC<StoreListProps> = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListStoresPrivateBody, ListStoresPrivateQuery, ListStoresPrivateResponse>({
    url: `/store/list`,
    method: HTTP_METHOD.GET
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

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
