import { mdiTag, mdiTagEdit, mdiTagOff, mdiTagPlus, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetProductPrivateBody, GetProductPrivateQuery, GetProductPrivateResponse, ListProductsPrivateBody, ListProductsPrivateQuery, ListProductsPrivateResponse } from '../../../../api/src/types/api';
import Loader from '../../components/core/Loader';
import { Button, FloatingActionButton, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

export const ProductLayout: React.FC = () => {
  return (
    <div>
      <nav className="bg-sky-800 flex gap-4 p-4">
        <Link href=".">About Product</Link>
        <Link href="item/list">View Items</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export const ProductHome: React.FC = () => {
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetProductPrivateBody, GetProductPrivateQuery, GetProductPrivateResponse>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const product = response?.product;

  return (
    <div>
      <H2>{product!.name}</H2>
      <p>{JSON.stringify(product)}</p>
      <Link href="../product/list">Back</Link>
      <FloatingActionButton onClick={() => navigate('edit', { state: { product }})} path={mdiTagEdit} label='Edit Product' />
    </div>
  );
};

type ProductState = {
    id: string;
    storeId: string;
    name: string;
    description: string | null;
    image: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export const ProductEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: ProductState | undefined = location.state?.product;

  return (
    <div>
      <H2>{product?.id ? 'Edit' : 'New'} Product</H2>
      <p>{JSON.stringify(product)}</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export const ProductList: React.FC = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListProductsPrivateBody, ListProductsPrivateQuery, ListProductsPrivateResponse>({
    url: `/admin/store/${storeId}/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const products = response?.products;

  return (
    <div className='w-full p-4'>
      <div className='flex flex-col w-full max-w-[960px] mx-auto gap-4'>
        {products?.map((product) => (
          <RouterLink className='flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md' key={product.id} to={`../product/${product.id}`}  title={`View product: ${product.name}`}>
              <p className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>{product.name}</p>
              <Icon path={product.isPublished ? mdiTag : mdiTagOff} size={0.75} title={product.isPublished ? 'Public' : 'Unlisted'} color={product.isPublished ? '#64748B' : '#F87171'} />
              <div className='flex gap-2 items-center opacity-60' title={`Last Updated: ${new Date(product.updatedAt).toLocaleDateString()}`}>
                <Icon path={mdiUpdate} size={0.75} />
                <p className='text-sm'>{new Date(product.updatedAt).toLocaleDateString()}</p>
              </div>
          </RouterLink>
        ))}
      </div>
      <FloatingActionButton path={mdiTagPlus} label='New Product' onClick={() => navigate('../product/new')} />
    </div>
  );
};
