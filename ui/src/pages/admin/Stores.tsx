import { zodResolver } from '@hookform/resolvers/zod';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListStoresAdminBody,
  ListStoresAdminQuery,
  ListStoresAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid, Card, Container } from '../../components/container';
import { StoreAdminForm } from '../../components/form';
import { SelectInput, TextInput } from '../../components/input';
import { EmptyText } from '../../components/typography';
import {
  DEFAULT_FORM_VALUES,
  storeAdminParamsFormSchema,
} from '../../config/forms/store-admin-params-form';
import { statusOptions } from '../../config/options';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import useDebounce from '../../hooks/useDebounce';

type Row = ListStoresAdminResponse['stores'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Store Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    flex: 1,
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

export const StoresAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [params, setParams] =
    useState<ListStoresAdminQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, response } = useApi<
    ListStoresAdminBody,
    ListStoresAdminQuery,
    ListStoresAdminResponse
  >(
    {
      url: `/admin/store/list`,
      method: HTTP_METHOD.GET,
      params,
    },
    { reTrigger: reload },
  );

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(storeAdminParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditStoreForm = (id: string) =>
    openModal(<StoreAdminForm storeId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditStoreForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const stores = response?.stores;

  return (
    <Container>
      <Card>
        <div className="flex gap-4">
          <TextInput
            type="search"
            name="search"
            label="Search Stores"
            control={control}
            invalidText={errors?.search?.message}
          />
          <SelectInput
            name="statusFilter"
            label="Status"
            options={statusOptions}
            control={control}
            invalidText={errors?.statusFilter?.message}
          />
        </div>
        {stores && stores.length ? (
          <AgGrid<Row>
            cols={columns}
            rows={stores}
            onRowClicked={onRowClicked}
          />
        ) : (
          <EmptyText className="text-center">No stores found</EmptyText>
        )}
      </Card>
    </Container>
  );
};
