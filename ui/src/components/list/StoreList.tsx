import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ListStoresDashboardBody,
  ListStoresDashboardQuery,
  ListStoresDashboardResponse,
} from '../../../../api/src/types/api';
import { Grid } from '../../components/container';
import { Loader } from '../../components/core';
import { IconImage, IsPublished } from '../../components/display';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { EmptyText, H5 } from '../typography';

export const StoreList: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListStoresDashboardBody,
    ListStoresDashboardQuery,
    ListStoresDashboardResponse
  >({
    url: `/dashboard/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No stores found. Contact your administrator to create or be added to a store.</EmptyText>
      </div>
    );
  }

  return (
    <Grid className="!p-0">
      {stores?.map((store) => (
        <RouterLink
          className="flex flex-col p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={store.id}
          to={`store/${store.id}`}
          title={`View store: ${store.name}`}
        >
          <div className='mb-4 flex justify-center w-full'>
            <IconImage image={store?.image} name={store.name} />
          </div>
          <H5 className="w-full text-left whitespace-nowrap text-ellipsis overflow-hidden">{store.name}</H5>
          <div className="flex gap-4 w-full justify-between">
            <div
              className="flex gap-2 items-center opacity-60"
              title={`Last Updated: ${new Date(store.updatedAt).toLocaleDateString()}`}
            >
              <Icon path={mdiUpdate} size={0.75} />
              <p className="text-sm">{new Date(store.updatedAt).toLocaleDateString()}</p>
            </div>
            <IsPublished isPublished={store.isPublished} pathType="store" />
          </div>
        </RouterLink>
      ))}
    </Grid>
  );
};
