import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListStoresAdminBody, ListStoresAdminQuery, ListStoresAdminResponse } from '../../../../api/src/types/api';
import { Card, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ListStore = ListStoresAdminResponse['stores'][0];

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

  const getColumns = (store: ListStore) => {
    const keys = Object.keys(store);
    return keys.map((key) => {
      return {
        key,
        label: key,
      };
    });
  };

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Stores</H4>
        </Card>
        <Card>
          {stores && stores.length ? (<Table columns={getColumns(stores[0])} data={stores} />) : <EmptyText>No stores found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
