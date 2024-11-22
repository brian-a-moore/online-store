import { mdiBarcode, mdiBarcodeOff, mdiDelete, mdiPencil, mdiPlus, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  GetProductPrivateBody,
  GetProductPrivateQuery,
  GetProductPrivateResponse,
  ListItemsPrivateBody,
  ListItemsPrivateQuery,
  ListItemsPrivateResponse,
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { IconImage } from '../../components/display';
import { Button, FloatingActionButton } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const ProductHome: React.FC = () => {
  const { setModal } = useContext(ModalContext);
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetProductPrivateBody,
    GetProductPrivateQuery,
    GetProductPrivateResponse
  >({
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
            <div className='flex gap-4'>
              <Button variant='secondary' onClick={() => navigate('edit', { state: { product }})} title='Edit Product'>
                <Icon path={mdiPencil} size={0.75} />
              </Button>
              <Button
                variant="destructive"
                title="Delete Store"
                onClick={() =>
                  setModal({
                    title: 'Delete Product',
                    Body: (
                      <p>
                        Deleting a product will remove all the products data, including its; items, sales and
                        history. This is immediate and unrecoverable. Are you sure you want to delete this product?
                      </p>
                    ),
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
          </div>
          <div>
            <IconImage image={product?.image} name={product!.name} />
          </div>
          <p>{JSON.stringify(product)}</p>
        </Card>
      <ItemList storeId={storeId!} productId={productId!} />
      </Container>
    </Page>
  );
};

type Props = {
  storeId: string;
  productId: string;
};

const ItemList: React.FC<Props> = ({ storeId, productId }) => {
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
    <>
      {items?.map((item) => (
        <RouterLink
          className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={item.id}
          to={`item/${item.id}`}
          title={`View item: ${item.name}`}
        >
          <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{item.name}</p>
          <Icon
            path={item.isPublished ? mdiBarcode : mdiBarcodeOff}
            size={0.75}
            title={item.isPublished ? 'Public' : 'Unlisted'}
            color={item.isPublished ? '#64748B' : '#F87171'}
          />
          <div
            className="flex gap-2 items-center opacity-60"
            title={`Last Updated: ${new Date(item.updatedAt).toLocaleDateString()}`}
          >
            <Icon path={mdiUpdate} size={0.75} />
            <p className="text-sm">{new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </RouterLink>
      ))}
      <FloatingActionButton path={mdiPlus} label="New Item" onClick={() => navigate('item/new')} />
    </>
  );
};
