import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListSuperusersAdminQuery,
  ListSuperusersAdminResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import { AgGrid, Card, Container } from '../../components/container';
import { SuperuserAdminForm } from '../../components/form';
import { SelectInput, TextInput } from '../../components/input';
import { EmptyText } from '../../components/typography';
import {
  DEFAULT_FORM_VALUES,
  superuserAdminParamsFormSchema,
} from '../../config/forms/superuser-admin-params-form';
import { userSearchOptions } from '../../config/options';
import { ModalContext } from '../../context/ModalContext';
import useDebounce from '../../hooks/useDebounce';

type Row = ListSuperusersAdminResponse['superusers'][0];

const columns: ColDef<Row>[] = [
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
    valueFormatter: (params: { value: Date }) =>
      new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params: { value: Date }) =>
      new Date(params.value).toLocaleDateString(),
  },
];

export const SuperusersAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [params, setParams] =
    useState<ListSuperusersAdminQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-superusers-admin', params],
    queryFn: () => api.superuser.listSuperusersAdmin(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(superuserAdminParamsFormSchema),
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
    openModal(<SuperuserAdminForm superuserId={id} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditUserForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const superusers = data?.superusers;

  return (
    <Container>
      <Card>
        <div className="flex gap-4">
          <TextInput
            type="search"
            name="search"
            label="Search Superusers"
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
        {superusers && superusers.length ? (
          <AgGrid<Row>
            cols={columns}
            rows={superusers}
            onRowClicked={onRowClicked}
          />
        ) : (
          <EmptyText className="text-center">No superusers found</EmptyText>
        )}
      </Card>
    </Container>
  );
};
