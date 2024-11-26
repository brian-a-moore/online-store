import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H3, H4 } from '../../components/typography';
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
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse>({
    url: `/admin/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openEditProductForm = (id: string) => {
    openModal(<>
      <div className='flex justify-between'>
        <H3>Edit Product</H3>
        <p>form</p>
        <div className='flex gap-4'>
          <Button variant='secondary' title='Delete Product' onClick={() => openDeleteProductDialog(id)}>
            <Icon path={mdiDelete} size={0.75} />
          </Button>
        </div>
      </div>
      <p>form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Update Product</Button>
      </div>
    </>);
  };

  const openDeleteProductDialog = (id: string) => {
    openModal(<>
      <H3>Delete Product</H3>
      <p>Are you sure you want to delete this product?</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='destructive' onClick={closeModal}>Delete Product</Button>
      </div>
    </>);
  };

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
