import { mdiDelete, mdiTag, mdiTagOff, mdiTagPlus, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetProductPrivateBody, GetProductPrivateQuery, GetProductPrivateResponse, ListProductsPrivateBody, ListProductsPrivateQuery, ListProductsPrivateResponse } from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import Loader from '../../components/core/Loader';
import { Button, FloatingActionButton } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const ProductLayout: React.FC = () => {
  return (
    <div>
        <Outlet />
    </div>
  );
};

export const ProductHome: React.FC = () => {
  const { setModal } = useContext(ModalContext);
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
    <Page>
      <Container>
        <Card>
          <div className="flex justify-between">
            <H2>{product!.name}</H2>
<Button
              variant="destructive"
              title="Delete Product"
              onClick={() =>
                setModal({
                  title: 'Delete Product',
                  Body: <p>Deleting a product will remove all the products data, including its; items, sales and history. This is immediate and unrecoverable. Are you sure you want to delete this product?</p>,
                  ActionBar: [
                    <Button variant="secondary" onClick={() => setModal(null)}>
                      Cancel
                    </Button>,
                    <Button variant="destructive" onClick={() => {}}>
                      Delete Product
                    </Button>,
                  ],
                })
              }
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
          <hr />
          <p>{JSON.stringify(product)}</p>
          <hr />
          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <div className='flex gap-4'>
              <Button variant='secondary' onClick={() => navigate('edit', { state: { product }})}>Edit Product</Button>
              <Button onClick={() => navigate('item/list')}>View Items</Button>
            </div>
          </div>
        </Card>
      </Container>
    </Page>
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
    <Page>
      <Container>
        <Card>
          <H2>{product?.id ? 'Edit' : 'New'} Product</H2>
          <hr />
          <p>{JSON.stringify(product)}</p>
          <hr />
          <div className='flex justify-between'>
            <Button variant='secondary' onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </Container>
    </Page>
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
      <Container>
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
      </Container>
      <FloatingActionButton path={mdiTagPlus} label='New Product' onClick={() => navigate('../product/new')} />
    </div>
  );
};
