import { mdiDelete, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListStoresAdminBody, ListStoresAdminQuery, ListStoresAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H3, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
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

export const StoresAdmin: React.FC = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListStoresAdminBody, ListStoresAdminQuery, ListStoresAdminResponse>({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openNewStoreForm = () => {
    openModal(<>
      <H3>New Store</H3>
      <p>form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Create Store</Button>
      </div>
    </>);
  };

  const openEditStoreForm = (id: string) => {
    openModal(<>
      <div className='flex justify-between'>
        <H3>Edit Store</H3>
        <div className='flex gap-4'>
          <Button variant='secondary' title='Delete Store' onClick={() => openDeleteStoreDialog(id)}>
            <Icon path={mdiDelete} size={0.75} />
          </Button>
        </div>
      </div>
      <p>form</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button onClick={closeModal}>Update Store</Button>
      </div>
    </>);
  };

  const openDeleteStoreDialog = (id: string) => {
    openModal(<>
      <H3>Delete Store</H3>
      <p>Are you sure you want to delete this store?</p>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='destructive' onClick={closeModal}>Delete Store</Button>
      </div>
    </>);
  };

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  return (
    <Page>
      <Container>
        <Card className='!flex-row items-center justify-between'>
          <H4>Stores</H4>
          <Button title='New Store' onClick={openNewStoreForm}>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {stores && stores.length ? (<Table columns={columns} data={stores} onRowClick={openEditStoreForm} />) : <EmptyText>No stores found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
