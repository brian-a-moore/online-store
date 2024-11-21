import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { GetItemBody, GetItemQuery, GetItemResponse, ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse } from '../../../../api/src/types/api';
import { Card } from '../../components/container';
import Loader from '../../components/core/Loader';
import { ButtonLink, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ItemLayoutProps = {};

export const ItemLayout: React.FC<ItemLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-sky-900 flex gap-4 p-4">
        <Link href=".">About Item</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

type ItemHomeProps = {};

export const ItemHome: React.FC<ItemHomeProps> = () => {
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetItemBody, GetItemQuery, GetItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/list`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  console.log('response', response);

  return (
    <div>
      <h1>About Item</h1>
      <Link href="edit">Edit Item</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type ItemEditProps = {};

export const ItemEdit: React.FC<ItemEditProps> = () => {
  return (
    <div>
      <H2>Edit Item</H2>
      <Link href="..">Back</Link>
    </div>
  );
};

type ItemListProps = {};

export const ItemList: React.FC<ItemListProps> = () => {
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const items = response?.items;

  return (
    <div>
      <ButtonLink href="../item/new">New Item</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {items?.map((item: any) => (
          <RouterLink key={item.id} to={`../item/${item.id}`}>
            <Card>
              <p>{item.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
