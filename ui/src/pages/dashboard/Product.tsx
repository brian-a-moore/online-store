import { mdiDelete, mdiPencil, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { Card, Container } from '../../components/container';
import { IconImage, IsPublished, Separator } from '../../components/display';
import { ItemDashboardForm, ProductDashboardForm } from '../../components/form';
import { Button, TextButton } from '../../components/interactive';
import { ItemList } from '../../components/list';
import { EmptyText, H2, H3 } from '../../components/typography';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';

export const ProductDashboard: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { storeId, productId } = useParams();

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-product', storeId],
    queryFn: () => api.product.getProductDashboard(productId!),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openDeleteProductDialog = () => {
    const onClick = async () => {
      try {
        await api.dashboard.deleteProduct(productId!);
        closeModal();
        setToast({ type: 'success', message: 'Product deleted successfully' });
      } catch (error: any | unknown) {
        navigate(
          `/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`,
        );
      }
    };
    openModal(
      <>
        <H3>Delete Product</H3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Product
          </Button>
        </div>
      </>,
    );
  };
  const openEditProductForm = () =>
    openModal(
      <ProductDashboardForm storeId={storeId} productId={productId!} />,
    );
  const openNewItemForm = () =>
    openModal(<ItemDashboardForm productId={productId!} />);

  if (isLoading) return <p>Loading...</p>;

  const product = data?.product;

  return (
    <Container>
      <Card className="!flex-row">
        <IconImage
          image={product?.image}
          name="Product Icon"
          upload={{ storeId: storeId!, productId }}
        />
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <H2 className="line-clamp-1">{product?.name}</H2>
            <div className="flex gap-4">
              <Button
                variant="tertiary"
                onClick={openDeleteProductDialog}
                title="Delete Product"
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
              <Button
                variant="tertiary"
                onClick={openEditProductForm}
                title="Edit Product"
              >
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
          </div>
          {product?.description ? (
            <p className="line-clamp-3">{product.description}</p>
          ) : (
            <EmptyText>This product does not have a description.</EmptyText>
          )}
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <strong>Last Updated:</strong>{' '}
              {new Date(product!.updatedAt).toLocaleDateString()}
            </p>
            <IsPublished
              pathType="product"
              isPublished={!!product?.isPublished}
              longForm
            />
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between">
          <TextButton onClick={() => {}} isActive>
            Items
          </TextButton>
          <Button onClick={openNewItemForm} title="New Item">
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </div>
      </Card>
      <Card>
        <ItemList productId={productId!} />
      </Card>
    </Container>
  );
};
