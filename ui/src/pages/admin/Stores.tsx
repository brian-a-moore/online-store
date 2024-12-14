import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListStoresAdminBody,
  ListStoresAdminQuery,
  ListStoresAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid } from '../../components/container';
import { StoreAdminForm } from '../../components/form';
import { EmptyText } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

type Row = ListStoresAdminResponse['stores'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Store Name',
    flex: 2,
    filter: true,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    flex: 1,
    filter: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

export const StoresAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListStoresAdminBody,
    ListStoresAdminQuery,
    ListStoresAdminResponse
  >(
    {
      url: `/admin/store/list`,
      method: HTTP_METHOD.GET,
      params: { page: page.toString(), search: '', statusFilter: 'all' },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditStoreForm = (id: string) =>
    openModal(<StoreAdminForm storeId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditStoreForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const stores = response?.stores;

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
