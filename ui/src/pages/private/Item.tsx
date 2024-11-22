import { mdiBarcode, mdiBarcodeOff, mdiPlus, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { GetItemBody, GetItemQuery, GetItemResponse, ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse } from '../../../../api/src/types/api';
import Loader from '../../components/core/Loader';
import { FloatingActionButton, Link } from '../../components/interactive';
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
    <div className='w-full p-4'>
      <div className='flex flex-col w-full max-w-[960px] mx-auto gap-4'>
        {items?.map((item) => (
          <RouterLink className='flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md' key={item.id} to={`../item/${item.id}`}  title={`View item: ${item.name}`}>
              <p className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>{item.name}</p>
              <Icon path={item.isPublished ? mdiBarcode : mdiBarcodeOff} size={0.75} title={item.isPublished ? 'Public' : 'Unlisted'} color={item.isPublished ? '#64748B' : '#F87171'} />
              <div className='flex gap-2 items-center opacity-60' title={`Last Updated: ${new Date(item.updatedAt).toLocaleDateString()}`}>
                <Icon path={mdiUpdate} size={0.75} />
                <p className='text-sm'>{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
          </RouterLink>
        ))}
      </div>
      <FloatingActionButton path={mdiPlus} label='New Item' onClick={() => navigate('../item/new')} />
    </div>
  );
};
