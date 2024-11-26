import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { ProductAdminForm } from '../../components/form';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
  label: 'Product Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'storeName',
  label: 'Store Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'isPublished',
  label: 'Status',
  render: (value) => <p>{value}</p>,
}, {
  key: 'createdAt',
  label: 'Created Date',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}, {
  key: 'updatedAt',
  label: 'Last Updated',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}];

export const ProductsAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();

  const { error, isLoading, response } = useApi<ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse>({
    url: `/admin/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  }, { reTrigger: reload });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditProductForm = (id: string) => openModal(<ProductAdminForm productId={id} forceReload={forceReload} />);

  if (isLoading) return <Loader />;

  const products = response?.products;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Products</H4>
        </Card>
        <Card>
          {products && products.length ? (<Table columns={columns} data={products} onRowClick={openEditProductForm} />) : <EmptyText>No products found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
