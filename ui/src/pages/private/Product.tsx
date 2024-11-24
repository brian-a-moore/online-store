import { mdiDelete, mdiPencil, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetProductPrivateBody,
  GetProductPrivateQuery,
  GetProductPrivateResponse
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { IconImage, IsPublished } from '../../components/display';
import { ItemForm, ProductForm } from '../../components/form';
import { Button } from '../../components/interactive';
import { ItemList } from '../../components/list/ItemList';
import { EmptyText, H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const ProductPrivate: React.FC = () => {
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
            <div className="flex gap-4">
              <Button
                variant="secondary"
                title="Delete Store"
                onClick={() =>
                  setModal({
                    title: 'Delete Product',
                    Body: (
                      <p>
                        Deleting a product will remove all the products data, including its; items, sales and history.
                        This is immediate and unrecoverable. Are you sure you want to delete this product?
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
              <Button
                variant="secondary"
                onClick={() =>
                  setModal({
                    title: 'Update Product',
                    Body: <ProductForm storeId={storeId} productId={productId} />,
                    ActionBar: [
                      <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button key="submit" onClick={() => setModal(null)}>
                        Update Product
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiPencil} size={0.75} />
              </Button>
              <Button
                title="New Item"
                onClick={() => {
                  setModal({
                    title: 'New Item',
                    Body: <ItemForm />,
                    ActionBar: [
                      <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button key="submit" onClick={() => setModal(null)}>
                        Create Item
                      </Button>,
                    ],
                  });
                }}
              >
                <Icon path={mdiPlus} size={0.75} />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 items-center">
              <IconImage image={product?.image} name={product!.name} />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex-1">
                {product?.description ? <p>{product.description}</p> : <EmptyText>No Description</EmptyText>}
              </div>
              <hr />
              <div className="flex gap-4 items-center justify-end text-sm">
                <IsPublished isPublished={product!.isPublished} pathType="product" longForm /> |
                <p className="text-sm">
                  <strong>Created:</strong> {new Date(product!.createdAt).toLocaleDateString()}
                </p>
                |
                <p className="text-sm">
                  <strong>Updated:</strong> {new Date(product!.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
        <ItemList storeId={storeId!} productId={productId!} />
      </Container>
    </Page>
  );
};
