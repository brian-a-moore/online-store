import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListProductsDashboardBody,
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { AgGrid } from '../container';
import { IconImage, IsPublished } from '../display';
import { EmptyText } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

type Row = ListProductsDashboardResponse['products'][0];

const columns: ColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'image',
    headerName: '',
    width: 50,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IconImage image={params?.value} name="Store Icon" size="xs" />
        </div>
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Product Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IsPublished pathType="product" isPublished={params.value} />
        </div>
      </div>
    ),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) => new Date(params.value as string).toLocaleDateString(),
  },
];

export const ProductList: React.FC<Props> = ({ storeId, reload }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListProductsDashboardBody,
    ListProductsDashboardQuery,
    ListProductsDashboardResponse
  >(
    {
      url: `/dashboard/product/list`,
      method: HTTP_METHOD.GET,
      params: { storeId, page: page.toString() },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const onRowClicked = (e: RowClickedEvent<Row>) => navigate(`product/${e.data!.id}`);

  if (isLoading) return <p>Loading...</p>;

  const products = response?.products;

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No products found</EmptyText>
      </div>
    );
  }

  return (
    <>
      {products && products.length ? (
        <AgGrid<Row> cols={columns} rows={products} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText>No products found</EmptyText>
      )}
    </>
  );
};
