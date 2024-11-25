import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemsAdminBody, ListItemsAdminQuery, ListItemsAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
  label: 'Item Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'productName',
  label: 'Product Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'isPublished',
  label: 'Status',
  render: (value) => <p>{value}</p>,
},{
  key: 'createdAt',
  label: 'Created Date',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}, {
  key: 'updatedAt',
  label: 'Last Updated',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}];

export const ItemsAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListItemsAdminBody, ListItemsAdminQuery, ListItemsAdminResponse>({
    url: `/admin/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const items = response?.items;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Items</H4>
        </Card>
        <Card>
          {items && items.length ? (<Table columns={columns} data={items} />) : <EmptyText>No items found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
