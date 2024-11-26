import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListSuperusersAdminBody,
  ListSuperusersAdminQuery,
  ListSuperusersAdminResponse,
} from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { SuperuserForm } from '../../components/form';
import { Button } from '../../components/interactive';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [
  {
    key: 'name',
    label: 'User Name',
    render: (value) => <p>{value}</p>,
  },
  {
    key: 'email',
    label: 'Email',
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

export const SuperusersAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListSuperusersAdminBody,
    ListSuperusersAdminQuery,
    ListSuperusersAdminResponse
  >({
    url: `/admin/superuser/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openNewUserForm = () => openModal(<SuperuserForm />);
  const openEditUserForm = (id: string) => openModal(<SuperuserForm superuserId={id} />);

  if (isLoading) return <Loader />;

  const superusers = response?.superusers;

  return (
    <Page>
      <Container>
        <Card className="!flex-row items-center justify-between">
          <H4>Superusers</H4>
          <Button title="New Superuser" onClick={openNewUserForm}>
            <Icon path={mdiPlus} size={0.75} />
          </Button>
        </Card>
        <Card>
          {superusers && superusers.length ? (
            <Table columns={columns} data={superusers} onRowClick={openEditUserForm} />
          ) : (
            <EmptyText>No superusers found</EmptyText>
          )}
        </Card>
      </Container>
    </Page>
  );
};
