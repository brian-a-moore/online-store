import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse } from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Grid, ListItem } from '../container';
import { Loader } from '../core';
import { IsPublished } from '../display';
import { ItemForm } from '../form';
import { Button } from '../interactive';
import { EmptyText, H5 } from '../typography';

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

  if(!items || items.length === 0) {
    return(
      <div className='flex justify-center'>
        <EmptyText>No items found</EmptyText>
      </div>
    )
  };

  return (
    <Grid className='!p-0'>
      {items?.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => {
            setModal({
              title: 'Edit Item',
              Body: <ItemForm storeId={storeId} productId={productId} itemId={item.id} />,
              ActionBar: [
                <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                  Cancel
                </Button>,
                <Button key="submit" onClick={() => setModal(null)}>
                  Edit Item
                </Button>,
              ],
            })
          }}
          title={`Edit Item: ${item.name}`}
        >
          <H5 className="w-full whitespace-nowrap text-left text-ellipsis overflow-hidden" title={item.name}>{item.name}</H5>
          <div className='flex gap-4 w-full justify-between'>
            <div
              className="flex gap-2 items-center opacity-60"
              title={`Last Updated: ${new Date(item.updatedAt).toLocaleDateString()}`}
            >
              <Icon path={mdiUpdate} size={0.75} />
              <p className="text-sm">{new Date(item.updatedAt).toLocaleDateString()}</p>
            </div>
            <IsPublished isPublished={item.isPublished} pathType="item" />
          </div>
        </ListItem>
      ))}
    </Grid>
  );
};
