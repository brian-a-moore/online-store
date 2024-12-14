import { zodResolver } from '@hookform/resolvers/zod';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListProductsDashboardBody,
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
} from '../../../../api/src/types/api';
import {
  DEFAULT_FORM_VALUES,
  productDashboardParamsFormSchema,
} from '../../config/forms/product-dashboard-params-form';
import { statusOptions } from '../../config/options';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import useDebounce from '../../hooks/useDebounce';
import { AgGrid } from '../container';
import { IconImage, IsPublished } from '../display';
import { SelectInput, TextInput } from '../input';
import { EmptyText } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

type Row = ListProductsDashboardResponse['products'][0];

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
    headerName: 'Product Name',
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

export const ProductList: React.FC<Props> = ({ storeId, reload }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<ListProductsDashboardQuery>({
    storeId,
    ...DEFAULT_FORM_VALUES,
  });

  const { error, isLoading, response } = useApi<
    ListProductsDashboardBody,
    ListProductsDashboardQuery,
    ListProductsDashboardResponse
  >(
    {
      url: `/dashboard/product/list`,
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

  const products = response?.products;

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
