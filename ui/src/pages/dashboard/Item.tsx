import { mdiDelete, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { Card, Container } from '../../components/container';
import { IconImage, IsPublished, Separator } from '../../components/display';
import { ItemDashboardForm } from '../../components/form';
import { Button } from '../../components/interactive';
import { EmptyText, H2, H3 } from '../../components/typography';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';

export const ItemDashboard: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { storeId, productId, itemId } = useParams();
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-item-dashboard', itemId],
    queryFn: () => api.item.getItemDashboard(itemId!),
  });

  const deleteItemMutation = useMutation({
    mutationFn: api.item.deleteItemDashboard,
    onError: (error) => {
      navigate(`/500?error=${error?.message || 'An unknown error occurred'}`);
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Item deleted successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-items-dashboard'] });
      closeModal();
      navigate(-1);
    },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openDeleteProductDialog = () => {
    const onClick = () => deleteItemMutation.mutate(itemId!);
    openModal(
      <>
        <H3>Delete Item</H3>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Item
          </Button>
        </div>
      </>,
    );
  };
  const openEditItemForm = () =>
    openModal(<ItemDashboardForm productId={productId!} itemId={itemId} />);

  if (isLoading) return <p>Loading...</p>;

  const item = data?.item;

  return (
    <Container>
      <Card className="!flex-row">
        <IconImage
          image={item?.image}
          name="Item Icon"
          upload={{ storeId: storeId!, productId, itemId }}
        />
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <H2 className="line-clamp-1">{item?.name}</H2>
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
                onClick={openEditItemForm}
                title="Edit Item"
              >
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
          </div>
          {item?.description ? (
            <p className="line-clamp-3">{item.description}</p>
          ) : (
            <EmptyText>This item does not have a description.</EmptyText>
          )}
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <strong>Last Updated:</strong>{' '}
              {new Date(item!.updatedAt).toLocaleDateString()}
            </p>
            <IsPublished
              pathType="item"
              isPublished={!!item?.isPublished}
              longForm
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};
