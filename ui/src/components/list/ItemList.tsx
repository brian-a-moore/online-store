import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListItemsDashboardQuery,
  ListItemsDashboardResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import {
  DEFAULT_FORM_VALUES,
  itemDashboardParamsFormSchema,
} from '../../config/forms/item-dashboard-params-form';
import { statusOptions } from '../../config/options';
import useDebounce from '../../hooks/useDebounce';
import { AgGrid } from '../container';
import { IconImage, IsPublished } from '../display';
import { SelectInput, TextInput } from '../input';
import { EmptyText } from '../typography';

type Props = {
  productId: string;
};

type Row = ListItemsDashboardResponse['items'][0];

const columns: ColDef<Row>[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'image',
    headerName: '',
    width: 50,
    sortable: false,
    cellRenderer: (params: { value: string }) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IconImage image={params?.value} name="Store Icon" size="xs" />
        </div>
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Item Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <IsPublished pathType="item" isPublished={params.value} />
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

export const ItemList: React.FC<Props> = ({ productId }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<ListItemsDashboardQuery>({
    ...DEFAULT_FORM_VALUES,
    productId,
  });

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-items-dashboard', params],
    queryFn: () => api.item.listItemsDashboard(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(itemDashboardParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams({ ...form, productId });
  }, [form.page, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const onRowClicked = (e: RowClickedEvent<Row>) =>
    navigate(`item/${e.data!.id}`);

  if (isLoading) return <p>Loading...</p>;

  const items = data?.items;

  return (
    <>
      <div className="flex gap-4">
        <TextInput
          type="search"
          name="search"
          label="Search Items"
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
      {items && items.length ? (
        <AgGrid<Row> cols={columns} rows={items} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText className="text-center">No items found</EmptyText>
      )}
    </>
  );
};
