import { mdiDelete, mdiNotePlus, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetProductDashboardBody,
  GetProductDashboardQuery,
  GetProductDashboardResponse
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { IconImage, IsPublished, Separator } from '../../components/display';
import { ItemForm, ProductForm } from '../../components/form';
import { Button } from '../../components/interactive';
import { ItemList } from '../../components/list/ItemList';
import { EmptyText, H2, H3 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const ProductDashboard: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetProductDashboardBody,
    GetProductDashboardQuery,
    GetProductDashboardResponse
  >({
    url: `/dashboard/product/${productId}`,
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
                onClick={() => {
                  openModal(<>
                    <H3>Delete Product</H3>
                    <p>
                        Deleting a product will remove all the products data, including its; items, sales and history.
                        This is immediate and unrecoverable. Are you sure you want to delete this product?
                      </p>
                    <div className='flex justify-between'>
                      <Button variant="secondary" key="cancel" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button variant='destructive' key="submit" onClick={closeModal}>
                        Delete Product
                      </Button>
                    </div>
                  </>);
                }}
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  openModal(<>
                    <H3>Edit Product</H3>
                    <ProductForm storeId={storeId} productId={productId} />
                    <div className='flex justify-between'>
                      <Button variant="secondary" key="cancel" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button key="submit" onClick={closeModal}>
                        Edit Product
                      </Button>
                    </div>
                  </>);
                }}
              >
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 items-center">
              <IconImage image={product?.image} name={product!.name} />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex-1">
                {product?.description ? <p className='line-clamp-4'>{product.description}</p> : <EmptyText>No Description</EmptyText>}
              </div>
              <Separator />
              <div className="flex gap-4 items-center justify-between text-sm">
                <div className='flex gap-4'>
                  <IsPublished isPublished={product!.isPublished} pathType="product" longForm /> |
                  <p className="text-sm">
                    <strong>Created:</strong> {new Date(product!.createdAt).toLocaleDateString()}
                  </p>
                  |
                  <p className="text-sm">
                    <strong>Updated:</strong> {new Date(product!.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              <Button
                title="New Item"
                onClick={() => {
                  openModal(<>
                    <H3>New Item</H3>
                    <ItemForm />
                    <div className='flex justify-between'>
                      <Button variant="secondary" key="cancel" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button key="submit" onClick={closeModal}>
                        Create Item
                      </Button>
                    </div>
                  </>);
                }}
              >
                <Icon path={mdiNotePlus} size={0.75} />
              </Button>
              </div>
            </div>
          </div>
        </Card>
        <ItemList storeId={storeId!} productId={productId!} />
      </Container>
    </Page>
  );
};
