import { mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ListProductsDashboardBody,
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
} from '../../../../api/src/types/api';
import { Loader } from '../../components/core';
import { IsPublished } from '../../components/display';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Grid } from '../container';
import { EmptyText, H5 } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

export const ProductList: React.FC<Props> = ({ storeId, reload }) => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListProductsDashboardBody,
    ListProductsDashboardQuery,
    ListProductsDashboardResponse
  >(
    {
      url: `/dashboard/product/list`,
      method: HTTP_METHOD.GET,
      params: { storeId, page: '1' },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const products = response?.products;

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No products found</EmptyText>
      </div>
    );
  }

  return (
    <Grid className="!p-0">
      {products?.map((product) => (
        <RouterLink
          className="flex flex-col p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={product.id}
          to={`product/${product.id}`}
          title={`View Product: ${product.name}`}
        >
          <H5 className="w-full text-left whitespace-nowrap text-ellipsis overflow-hidden">{product.name}</H5>
          <div className="flex gap-4 w-full justify-between">
            <div
              className="flex gap-2 items-center opacity-60"
              title={`Last Updated: ${new Date(product.updatedAt).toLocaleDateString()}`}
            >
              <Icon path={mdiUpdate} size={0.75} />
              <p className="text-sm">{new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
            <IsPublished isPublished={product.isPublished} pathType="product" />
          </div>
        </RouterLink>
      ))}
    </Grid>
  );
};
