import { mdiStore, mdiStorefrontPlus, mdiStoreOff, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse, ListStoresPrivateBody, ListStoresPrivateQuery, ListStoresPrivateResponse } from '../../../../api/src/types/api';
import Loader from '../../components/core/Loader';
import { FloatingActionButton, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type StoreLayoutProps = {};

export const StoreLayout: React.FC<StoreLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-sky-700 flex gap-4 p-4">
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

  if (isLoading) return <Loader />;

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
    <div className='w-full p-4'>
      <div className='flex flex-col w-full max-w-[960px] mx-auto gap-4'>
        {stores?.map((store) => (
          <RouterLink className='flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md' key={store.id} to={`../store/${store.id}`}  title={`View store: ${store.name}`}>
              <p className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>{store.name}</p>
              <Icon path={store.isPublished ? mdiStore : mdiStoreOff} size={0.75} title={store.isPublished ? 'Public' : 'Unlisted'} color={store.isPublished ? '#64748B' : '#F87171'} />
              <div className='flex gap-2 items-center opacity-60' title={`Last Updated: ${new Date(store.updatedAt).toLocaleDateString()}`}>
                <Icon path={mdiUpdate} size={0.75} />
                <p className='text-sm'>{new Date(store.updatedAt).toLocaleDateString()}</p>
              </div>
          </RouterLink>
        ))}
      </div>
      <FloatingActionButton path={mdiStorefrontPlus} label='New Store' onClick={() => navigate('../store/new')} />
    </div>
  );
};
