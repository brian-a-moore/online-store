import { mdiDelete, mdiPencil, mdiTagPlus, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  GetStorePrivateBody,
  GetStorePrivateQuery,
  GetStorePrivateResponse,
  ListProductsPrivateBody,
  ListProductsPrivateQuery,
  ListProductsPrivateResponse
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { BannerImage, IconImage, IsPublished } from '../../components/display';
import { Button, FloatingActionButton } from '../../components/interactive';
import { EmptyText, H1 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const StoreHome: React.FC = () => {
  const { setModal } = useContext(ModalContext);
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
        <Card className="!p-0">
          <div className="relative h-40">
            <BannerImage className="absolute top-0 left-0" image={store?.heroImage} name={store!.name} />
            <IconImage className="absolute top-20 left-8 z-10" image={store?.image} name={store!.name} />
            <div className='absolute top-4 right-4 flex gap-4 z-10'>
              <Button variant='secondary' onClick={() => navigate('edit', { state: { store }})} title='Edit Store'>
                <Icon path={mdiPencil} size={0.75} />
              </Button>
              <Button
                variant="destructive"
                title="Delete Store"
                onClick={() =>
                  setModal({
                    title: 'Delete Store',
                    Body: (
                      <p>
                        Deleting a store will remove all the stores data, including its; products, items, sales and
                        history. This is immediate and unrecoverable. Are you sure you want to delete this store?
                      </p>
                    ),
                    ActionBar: [
                      <Button variant="secondary" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button variant="destructive" onClick={() => {}}>
                        Delete Store
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="flex pl-40 items-center justify-between">
              <H1>{store!.name}</H1>
              <IsPublished isPublished={store!.isPublished} pathType='store' longForm />
            </div>
            {store?.description ? <p>{store.description}</p> : <EmptyText>No Description</EmptyText>}
          </div>
        </Card>
        <ProductList storeId={storeId!} />
      </Container>
    </Page>
  );
};

type Props = {
  storeId: string;
}

const ProductList: React.FC<Props> = ({ storeId }) => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListProductsPrivateBody,
    ListProductsPrivateQuery,
    ListProductsPrivateResponse
  >({
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
    <>
      {products?.map((product) => (
        <RouterLink
          className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={product.id}
          to={`product/${product.id}`}
          title={`View product: ${product.name}`}
        >
          <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{product.name}</p>
          <IsPublished isPublished={product.isPublished} pathType='product' />
          <div
            className="flex gap-2 items-center opacity-60"
            title={`Last Updated: ${new Date(product.updatedAt).toLocaleDateString()}`}
          >
            <Icon path={mdiUpdate} size={0.75} />
            <p className="text-sm">{new Date(product.updatedAt).toLocaleDateString()}</p>
          </div>
        </RouterLink>
      ))}
      <FloatingActionButton path={mdiTagPlus} label="New Product" onClick={() => navigate('product/new')} />
    </>
  );
};
