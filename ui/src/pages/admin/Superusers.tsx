import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListSuperusersAdminBody, ListSuperusersAdminQuery, ListSuperusersAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
  label: 'User Name',
  render: (value) => <p>{value}</p>,
},{
  key: 'email',
  label: 'Email',
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

  if (isLoading) return <Loader />;

  const superusers = response?.superusers;

  return (
    <Page>
      <Container>
        <Card className='!flex-row items-center justify-between'>
          <H4>Superusers</H4>
          <Button title='New Superuser'>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {superusers && superusers.length ? (<Table columns={columns} data={superusers} />) : <EmptyText>No superusers found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
