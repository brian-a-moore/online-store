import { mdiDelete, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetItemDashboardBody,
  GetItemDashboardQuery,
  GetItemDashboardResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { IconImage, IsPublished, Separator } from '../../components/display';
import { ItemDashboardForm } from '../../components/form';
import { Button } from '../../components/interactive';
import { EmptyText, H2, H3 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import useApi from '../../hooks/useApi';

export const ItemDashboard: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const { storeId, productId, itemId } = useParams();
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();

  const { error, isLoading, response } = useApi<
    GetItemDashboardBody,
    GetItemDashboardQuery,
    GetItemDashboardResponse
  >(
    {
      url: `/dashboard/item/${itemId}`,
      method: HTTP_METHOD.GET,
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openDeleteItem = () => {
    const onClick = async () => {
      try {
        await api.dashboard.deleteItem(itemId!);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Item deleted successfully' });
        navigate(`/dashboard/store/${storeId}/product/${productId}`);
      } catch (error: any | unknown) {
        navigate(`/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`);
      }
    };
    openModal(
      <>
        <H3>Delete Item</H3>
        <p>
          Deleting a item will remove all the item's data, including its; sales and history. This is
          immediate and unrecoverable. Are you sure you want to delete this item?
        </p>
        <div className="flex justify-between">
          <Button variant="secondary" key="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" key="submit" onClick={onClick}>
            Delete Item
          </Button>
        </div>
      </>,
    );
  };

  const openEditItem = () => openModal(<ItemDashboardForm itemId={itemId!} productId={productId!} forceReload={forceReload} />);

  if (isLoading) return <Loader />;

  const item = response?.item;

  return (
    <Page>
      <Container>
        <Card>
          <div className="flex justify-between">
            <H2>{item!.name}</H2>
            <div className="flex gap-4">
              <Button variant="secondary" title="Delete Item" onClick={openDeleteItem}>
                <Icon path={mdiDelete} size={0.75} />
              </Button>
              <Button variant="secondary" onClick={openEditItem}>
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 items-center">
              <IconImage image={item?.image} name={item!.name} upload={{ storeId: storeId!, productId, itemId }} rounded={false} />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex-1">
                {item?.description ? (
                  <p className="line-clamp-4">{item.description}</p>
                ) : (
                  <EmptyText>No Description</EmptyText>
                )}
              </div>
              <Separator />
              <div className="flex gap-4 items-center justify-between text-sm">
                <div className="flex gap-4">
                  <IsPublished isPublished={item!.isPublished} pathType="item" longForm /> |
                  <p className="text-sm">
                    <strong>Created:</strong> {new Date(item!.createdAt).toLocaleDateString()}
                  </p>
                  |
                  <p className="text-sm">
                    <strong>Updated:</strong> {new Date(item!.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Page>
  );
};
