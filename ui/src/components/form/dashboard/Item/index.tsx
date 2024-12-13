import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetItemDashboardBody,
  GetItemDashboardQuery,
  GetItemDashboardResponse
} from '../../../../../../api/src/types/api';
import { api } from '../../../../api';
import { HTTP_METHOD } from '../../../../constants';
import { ModalContext } from '../../../../context/ModalContext';
import { ToastContext } from '../../../../context/ToastContext';
import useApi from '../../../../hooks/useApi';
import { Separator } from '../../../display';
import { Button, TextButton } from '../../../interactive';
import { H3 } from '../../../typography';
import { FixedItemForm } from './FixedItem';
import { VariableItemForm } from './VariableItem';

type Props = {
  productId: string;
  itemId?: string;
};

export const ItemDashboardForm: React.FC<Props> = ({ itemId, productId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [itemTypeId, setItemTypeId] = useState<number | null>(1);

  const { error, isLoading, response } = useApi<GetItemDashboardBody, GetItemDashboardQuery, GetItemDashboardResponse>(
    {
      method: HTTP_METHOD.GET,
      url: `/dashboard/item/${itemId}`,
    },
    { isAutoTriggered: !!itemId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if(response?.item) {
      setItemTypeId(response.item.itemTypeId);
    };
  }, [response?.item])

  const openDeleteItemDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.dashboard.deleteItem(id);
        navigate(-1);
        setToast({ type: 'success', message: 'Item deleted successfully' });
      } catch (error: any | unknown) {
        navigate(`/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`);
      }
    };
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex justify-between">
        <H3>{itemId ? 'Edit' : 'New'} Item</H3>
        {itemId ? (
          <div className="flex gap-4">
            <Button variant="tertiary" title="Delete Item" onClick={() => openDeleteItemDialog(itemId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <Separator />
      <div className="flex items-center gap-4">
        <TextButton onClick={() => setItemTypeId(1)} isActive={itemTypeId === 1}>
          Fixed Price
        </TextButton>
        |
        <TextButton onClick={() => setItemTypeId(2)} isActive={itemTypeId === 2}>
          Variable Price
        </TextButton>
      </div>
      {itemTypeId === 1 ? (
        <FixedItemForm item={response?.item} productId={productId} />
      ) : (
        <VariableItemForm item={response?.item} productId={productId} />
      )}
    </div>
  );
};
