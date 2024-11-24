import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse } from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { ListItem } from '../container';
import { Loader } from '../core';
import { IsPublished } from '../display';
import { ItemForm } from '../form';
import { Button } from '../interactive';

type Props = {
  storeId: string;
  productId: string;
};

export const ItemList: React.FC<Props> = ({ storeId, productId }) => {
  const { setModal } = useContext(ModalContext);
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
        <ListItem
          key={item.id}
          onClick={() => {
            setModal({
              title: 'Update Item',
              Body: <ItemForm item={item} />,
              ActionBar: [
                <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                  Cancel
                </Button>,
                <Button key="submit" onClick={() => setModal(null)}>
                  Update Item
                </Button>,
              ],
            })
          }}
          title={`Update Item: ${item.name}`}
        >
          <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{item.name}</p>
          <IsPublished isPublished={item.isPublished} pathType="item" />
          <div
            className="flex gap-2 items-center opacity-60"
            title={`Last Updated: ${new Date(item.updatedAt).toLocaleDateString()}`}
          >
            <Icon path={mdiUpdate} size={0.75} />
            <p className="text-sm">{new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </ListItem>
      ))}
    </>
  );
};
