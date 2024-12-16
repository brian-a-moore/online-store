import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListUsersAdminQuery,
  ListUsersAdminResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import { AgGrid, Card, Container } from '../../components/container';
import { UserAdminForm } from '../../components/form/admin/User';
import { SelectInput, TextInput } from '../../components/input';
import { EmptyText } from '../../components/typography';
import {
  DEFAULT_FORM_VALUES,
  userAdminParamsFormSchema,
} from '../../config/forms/user-admin-params-form';
import { userSearchOptions } from '../../config/options';
import { ModalContext } from '../../context/ModalContext';
import useDebounce from '../../hooks/useDebounce';

type Row = ListUsersAdminResponse['users'][0];

const columns: ColDef[] = [
  { field: 'id', hide: true },
  {
    field: 'name',
    headerName: 'User Name',
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

export const UsersAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [params, setParams] =
    useState<ListUsersAdminQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-superusers-admin', params],
    queryFn: () => api.user.listUsersAdmin(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(userAdminParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.searchKey, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openEditUserForm = (id: string) =>
    openModal(<UserAdminForm userId={id} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditUserForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const users = data?.users;

  return (
    <Container>
      <Card>
        <div className="flex gap-4">
          <TextInput
            type="search"
            name="search"
            label="Search Users"
            control={control}
            invalidText={errors?.search?.message}
          />
          <SelectInput
            name="searchKey"
            label="Search By"
            options={userSearchOptions}
            control={control}
            invalidText={errors?.searchKey?.message}
          />
        </div>
        {users && users.length ? (
          <AgGrid<Row>
            cols={columns}
            rows={users}
            onRowClicked={onRowClicked}
          />
        ) : (
          <EmptyText className="text-center">No users found</EmptyText>
        )}
      </Card>
    </Container>
  );
};
