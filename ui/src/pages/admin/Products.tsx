import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListProductsAdminBody,
  ListProductsAdminQuery,
  ListProductsAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid } from '../../components/container';
import { ProductAdminForm } from '../../components/form';
import { EmptyText } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

type Row = ListProductsAdminResponse['products'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Product Name',
    flex: 2,
    filter: true,
  },
  {
    field: 'storeName',
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
    valueFormatter: (params) => new Date(params.value as string).toLocaleDateString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) => new Date(params.value as string).toLocaleDateString(),
  },
];

export const ProductsAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);

  const { error, isLoading, response } = useApi<
    ListProductsAdminBody,
    ListProductsAdminQuery,
    ListProductsAdminResponse
  >(
    {
      url: `/admin/product/list`,
      method: HTTP_METHOD.GET,
      params: { page: page.toString(), search: '', searchKey: 'name', statusFilter: 'all' },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditProductForm = (id: string) => openModal(<ProductAdminForm productId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) => openEditProductForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const products = response?.products;

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
