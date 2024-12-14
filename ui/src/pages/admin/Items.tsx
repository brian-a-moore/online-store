import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItemsAdminBody,
  ListItemsAdminQuery,
  ListItemsAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid, Card, Container } from '../../components/container';
import { ItemAdminForm } from '../../components/form';
import { EmptyText } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

type Row = ListItemsAdminResponse['items'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Item Name',
    flex: 2,
    filter: true,
  },
  {
    field: 'productName',
    headerName: 'Product Name',
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

export const ItemsAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListItemsAdminBody,
    ListItemsAdminQuery,
    ListItemsAdminResponse
  >(
    {
      url: `/admin/item/list`,
      method: HTTP_METHOD.GET,
      params: {
        page: page.toString(),
        search: '',
        searchKey: 'name',
        statusFilter: 'all',
      },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditItemForm = (id: string) =>
    openModal(<ItemAdminForm itemId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditItemForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const items = response?.items;

  return (
    <Container>
      <Card>
        {items && items.length ? (
          <AgGrid<Row>
            cols={columns}
            rows={items}
            onRowClicked={onRowClicked}
          />
        ) : (
          <EmptyText className="text-center">No items found</EmptyText>
        )}
      </Card>
    </Container>
  );
};
