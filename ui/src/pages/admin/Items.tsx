import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemsAdminBody, ListItemsAdminQuery, ListItemsAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H3, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [
  {
    key: 'name',
    label: 'Item Name',
    render: (value) => <p className="line-clamp-2">{value}</p>,
  },
  {
    key: 'productName',
    label: 'Product Name',
    render: (value) => <p className="line-clamp-2">{value}</p>,
  },
  {
    key: 'isPublished',
    label: 'Status',
    render: (value) => <p>{value}</p>,
  },
  {
    key: 'createdAt',
    label: 'Created Date',
    render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
  },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
  },
];

export const ItemsAdmin: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListItemsAdminBody, ListItemsAdminQuery, ListItemsAdminResponse>({
    url: `/admin/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openEditItemForm = (id: string) => {
    openModal(<>
      <div className='flex justify-between'>
        <H3>Edit Item</H3>
        <p>form</p>
        <div className='flex gap-4'>
          <Button variant='secondary' title='Delete Item' onClick={() => openDeleteItemDialog(id)}>
            <Icon path={mdiDelete} size={0.75} />
          </Button>
        </div>
      </div>
      <p>form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Update Item</Button>
      </div>
    </>);
  };

  const openDeleteItemDialog = (id: string) => {
    openModal(<>
      <H3>Delete Item</H3>
      <p>Are you sure you want to delete this item?</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='destructive' onClick={closeModal}>Delete Item</Button>
      </div>
    </>);
  };

  if (isLoading) return <Loader />;

  const items = response?.items;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Items</H4>
        </Card>
        <Card>
          {items && items.length ? (
            <Table columns={columns} data={items} onRowClick={openEditItemForm} />
          ) : (
            <EmptyText>No items found</EmptyText>
          )}
        </Card>
      </Container>
    </Page>
  );
};
