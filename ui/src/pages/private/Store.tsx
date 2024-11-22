import { mdiStore, mdiStorefrontPlus, mdiStoreOff, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  GetStorePrivateBody,
  GetStorePrivateQuery,
  GetStorePrivateResponse,
  ListStoresPrivateBody,
  ListStoresPrivateQuery,
  ListStoresPrivateResponse,
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { BreadCrumb } from '../../components/core/Breadcrumb';
import Loader from '../../components/core/Loader';
import { Button, FloatingActionButton } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type StoreLayoutProps = {};

export const StoreLayout: React.FC<StoreLayoutProps> = () => {
  return (
    <div>
      <BreadCrumb />
      <Outlet />
    </div>
  );
};

type StoreHomeProps = {};

export const StoreHome: React.FC<StoreHomeProps> = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const store = response?.store;

  return (
    <Page>
      <Container>
        <Card>
          <div className="flex justify-between">
            <H2>{store!.name}</H2>
            <Button variant="destructive" title="Delete Store" onClick={() => {}}>
              <Icon path={mdiStore} size={0.75} />
            </Button>
          </div>
          <hr />
          <p>{JSON.stringify(store)}</p>
          <hr />
          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => navigate('edit', { state: { store }})}>
                Edit Store
              </Button>
              <Button onClick={() => navigate('product/list')}>View Products</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Page>
  );
};

type StoreState = {
  id: string;
  name: string;
  website: string | null;
  description: string | null;
  image: string | null;
  heroImage: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const StoreEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const store: StoreState | undefined = location.state?.store;

  return (
    <Page>
      <Container>
        <Card>
          <H2>{store?.id ? 'Edit' : 'New'} Store</H2>
          <hr />
          <p>{JSON.stringify(store)}</p>
          <hr />
          <div className="flex justify-between">
            <Button variant='secondary' onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </Container>
    </Page>
  );
};

type StoreListProps = {};

export const StoreList: React.FC<StoreListProps> = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListStoresPrivateBody,
    ListStoresPrivateQuery,
    ListStoresPrivateResponse
  >({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  return (
    <div className="w-full p-4">
      <Container>
        {stores?.map((store) => (
          <RouterLink
            className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
            key={store.id}
            to={`../store/${store.id}`}
            title={`View store: ${store.name}`}
          >
            <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{store.name}</p>
            <Icon
              path={store.isPublished ? mdiStore : mdiStoreOff}
              size={0.75}
              title={store.isPublished ? 'Public' : 'Unlisted'}
              color={store.isPublished ? '#64748B' : '#F87171'}
            />
            <div
              className="flex gap-2 items-center opacity-60"
              title={`Last Updated: ${new Date(store.updatedAt).toLocaleDateString()}`}
            >
              <Icon path={mdiUpdate} size={0.75} />
              <p className="text-sm">{new Date(store.updatedAt).toLocaleDateString()}</p>
            </div>
          </RouterLink>
        ))}
      </Container>
      <FloatingActionButton path={mdiStorefrontPlus} label="New Store" onClick={() => navigate('../store/new')} />
    </div>
  );
};
