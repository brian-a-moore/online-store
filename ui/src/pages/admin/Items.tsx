import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemsAdminBody, ListItemsAdminQuery, ListItemsAdminResponse } from '../../../../api/src/types/api';
import { Card, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ListItem = ListItemsAdminResponse['items'][0];

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

  const getColumns = (item: ListItem) => {
    const keys = Object.keys(item);
    return keys.map((key) => {
      return {
        key,
        label: key,
      };
    });
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
          {items && items.length ? (<Table columns={getColumns(items[0])} data={items} />) : <EmptyText>No items found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
