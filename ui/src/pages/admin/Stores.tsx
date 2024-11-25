import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListStoresAdminBody, ListStoresAdminQuery, ListStoresAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
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
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListStoresAdminBody, ListStoresAdminQuery, ListStoresAdminResponse>({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  return (
    <Page>
      <Container>
        <Card className='!flex-row items-center justify-between'>
          <H4>Stores</H4>
          <Button title='New Store'>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {stores && stores.length ? (<Table columns={columns} data={stores} />) : <EmptyText>No stores found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
