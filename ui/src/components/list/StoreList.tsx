import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListStoresDashboardQuery,
  ListStoresDashboardResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import { IconImage, IsPublished } from '../../components/display';
import {
  DEFAULT_FORM_VALUES,
  storeDashboardParamsFormSchema,
} from '../../config/forms/store-dashboard-params-form';
import { statusOptions } from '../../config/options';
import useDebounce from '../../hooks/useDebounce';
import { AgGrid } from '../container';
import { SelectInput, TextInput } from '../input';
import { EmptyText } from '../typography';

type Row = ListStoresDashboardResponse['stores'][0];

const columns: ColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'image',
    headerName: '',
    width: 50,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IconImage image={params?.value} name="Store Icon" size="xs" />
        </div>
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Store Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IsPublished pathType="product" isPublished={params.value} />
        </div>
      </div>
    ),
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    flex: 1,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

export const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] =
    useState<ListStoresDashboardQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-stores-dashboard', params],
    queryFn: () => api.store.listStoresDashboard(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(storeDashboardParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const onRowClicked = (e: RowClickedEvent<Row>) =>
    navigate(`store/${e.data!.id}`);

  if (isLoading) return <p>Loading...</p>;

  const stores = data?.stores;

  return (
    <>
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
        <AgGrid<Row> cols={columns} rows={stores} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText className="text-center">No stores found</EmptyText>
      )}
    </>
  );
};
