import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import {
  DEFAULT_FORM_VALUES,
  productDashboardParamsFormSchema,
} from '../../config/forms/product-dashboard-params-form';
import { statusOptions } from '../../config/options';
import useDebounce from '../../hooks/useDebounce';
import { AgGrid } from '../container';
import { IconImage, IsPublished } from '../display';
import { SelectInput, TextInput } from '../input';
import { EmptyText } from '../typography';

type Props = {
  storeId: string;
};

type Row = ListProductsDashboardResponse['products'][0];

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
    headerName: 'Product Name',
    flex: 2,
  },
  {
    field: 'isPublished',
    headerName: 'Status',
    width: 100,
    cellRenderer: (params: { value: boolean }) => (
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
    valueFormatter: (params: { value: Date }) =>
      new Date(params.value).toLocaleDateString(),
  },
];

export const ProductList: React.FC<Props> = ({ storeId }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<ListProductsDashboardQuery>({
    storeId,
    ...DEFAULT_FORM_VALUES,
  });

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-products-dashboard', params],
    queryFn: () => api.product.listProductsDashboard(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(productDashboardParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams({ ...form, storeId });
  }, [form.page, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const onRowClicked = (e: RowClickedEvent<Row>) =>
    navigate(`product/${e.data!.id}`);

  if (isLoading) return <p>Loading...</p>;

  const products = data?.products;

  return (
    <>
      <div className="flex gap-4">
        <TextInput
          type="search"
          name="search"
          label="Search Products"
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
      {products && products.length ? (
        <AgGrid<Row>
          cols={columns}
          rows={products}
          onRowClicked={onRowClicked}
        />
      ) : (
        <EmptyText className="text-center">No products found</EmptyText>
      )}
    </>
  );
};
