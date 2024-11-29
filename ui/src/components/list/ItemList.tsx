import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItemsDashboardBody,
  ListItemsDashboardQuery,
  ListItemsDashboardResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Grid, ListItem } from '../container';
import { Loader } from '../core';
import { IsPublished } from '../display';
import { ItemDashboardForm } from '../form/dashboard';
import { EmptyText, H5 } from '../typography';

type Props = {
  storeId: string;
  productId: string;
  reload?: string;
};

export const ItemList: React.FC<Props> = ({ productId, reload: externalReload }) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();

  const { error, isLoading, response } = useApi<
    ListItemsDashboardBody,
    ListItemsDashboardQuery,
    ListItemsDashboardResponse
  >(
    {
      url: `/dashboard/item/list`,
      method: HTTP_METHOD.GET,
      params: { productId, page: '1' },
    },
    // TODO: Item list appears not to be updating when an item is updated, only when created
    { reTrigger: externalReload || reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditItemForm = (id: string) => {
    openModal(<ItemDashboardForm productId={productId} itemId={id} forceReload={forceReload} />);
  };

  if (isLoading) return <Loader />;

  const items = response?.items;

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No items found</EmptyText>
      </div>
    );
  }

  return (
    <Grid className="!p-0">
      {items?.map((item) => (
        <ListItem key={item.id} onClick={() => openEditItemForm(item.id)} title={`Edit Item: ${item.name}`}>
          <H5 className="w-full whitespace-nowrap text-left text-ellipsis overflow-hidden" title={item.name}>
            {item.name}
          </H5>
          <div className="flex gap-4 w-full justify-between">
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
