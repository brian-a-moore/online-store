import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ListItemsDashboardBody,
  ListItemsDashboardQuery,
  ListItemsDashboardResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Grid } from '../container';
import { Loader } from '../core';
import { IconImage, IsPublished } from '../display';
import { EmptyText, H5 } from '../typography';

type Props = {
  storeId: string;
  productId: string;
  reload?: string;
};

export const ItemList: React.FC<Props> = ({ productId, reload }) => {
  const navigate = useNavigate();

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
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

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
        <RouterLink
          className="flex flex-col p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={item.id}
          to={`item/${item.id}`}
          title={`View Item: ${item.name}`}
        >
          <div className='mb-4 flex justify-center w-full'>
            <IconImage image={item.image} name={item.name} rounded={false} />
          </div>
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
        </RouterLink>
      ))}
    </Grid>
  );
};
