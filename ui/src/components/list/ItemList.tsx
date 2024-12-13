import { ColDef, RowClickedEvent } from 'ag-grid-community';
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
import { AgGrid } from '../container';
import { IconImage, IsPublished } from '../display';
import { ItemDashboardForm } from '../form';
import { EmptyText } from '../typography';

type Props = {
  productId: string;
  reload?: string;
};

type Row = ListItemsDashboardResponse['items'][0];

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
    headerName: 'Item Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IsPublished pathType="item" isPublished={params.value} />
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

export const ItemList: React.FC<Props> = ({ productId, reload }) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListItemsDashboardBody,
    ListItemsDashboardQuery,
    ListItemsDashboardResponse
  >(
    {
      url: `/dashboard/item/list`,
      method: HTTP_METHOD.GET,
      params: { productId, page: page.toString() },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openEditItemForm = (id: string) => openModal(<ItemDashboardForm productId={productId} itemId={id} />);
  const onRowClicked = (e: RowClickedEvent<Row>) => openEditItemForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const items = response?.items;

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No items found</EmptyText>
      </div>
    );
  }

  return (
    <>
      {items && items.length ? (
        <AgGrid<Row> cols={columns} rows={items} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText>No items found</EmptyText>
      )}
    </>
  );
};
