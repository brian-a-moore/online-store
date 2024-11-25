import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListSuperusersAdminBody, ListSuperusersAdminQuery, ListSuperusersAdminResponse } from '../../../../api/src/types/api';
import { Card, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ListSuperuser = ListSuperusersAdminResponse['superusers'][0];

export const SuperusersAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListSuperusersAdminBody, ListSuperusersAdminQuery, ListSuperusersAdminResponse>({
    url: `/admin/superuser/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const getColumns = (superuser: ListSuperuser) => {
    const keys = Object.keys(superuser);
    return keys.map((key) => {
      return {
        key,
        label: key,
      };
    });
  };

  if (isLoading) return <Loader />;

  const superusers = response?.superusers;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Superusers</H4>
        </Card>
        <Card>
          {superusers && superusers.length ? (<Table columns={getColumns(superusers[0])} data={superusers} />) : <EmptyText>No superusers found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
