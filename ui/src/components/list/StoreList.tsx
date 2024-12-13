import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListStoresDashboardBody,
  ListStoresDashboardQuery,
  ListStoresDashboardResponse,
} from '../../../../api/src/types/api';
import { IconImage, IsPublished } from '../../components/display';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { AgGrid } from '../container';
import { EmptyText } from '../typography';

type Row = ListStoresDashboardResponse['stores'][0];

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
    headerName: 'Store Name',
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

export const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListStoresDashboardBody,
    ListStoresDashboardQuery,
    ListStoresDashboardResponse
  >({
    url: `/dashboard/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: page.toString() },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const onRowClicked = (e: RowClickedEvent<Row>) => navigate(`store/${e.data!.id}`);

  if (isLoading) return <p>Loading...</p>;

  const stores = response?.stores;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No stores found. Contact your administrator to create or be added to a store.</EmptyText>
      </div>
    );
  }

  return (
    <>
      {stores && stores.length ? (
        <AgGrid<Row> cols={columns} rows={stores} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText>No stores found</EmptyText>
      )}
    </>
  );
};
