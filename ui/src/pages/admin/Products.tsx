import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListProductsAdminQuery,
  ListProductsAdminResponse,
} from '../../../../api/src/types/api';
import { api } from '../../api';
import { AgGrid, Card, Container } from '../../components/container';
import { ProductAdminForm } from '../../components/form';
import { SelectInput, TextInput } from '../../components/input';
import { EmptyText } from '../../components/typography';
import {
  DEFAULT_FORM_VALUES,
  productAdminParamsFormSchema,
} from '../../config/forms/product-admin-params-form';
import { statusOptions } from '../../config/options';
import { ModalContext } from '../../context/ModalContext';
import useDebounce from '../../hooks/useDebounce';

type Row = ListProductsAdminResponse['products'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Product Name',
    flex: 2,
  },
  {
    field: 'storeName',
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

export const ProductsAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [params, setParams] =
    useState<ListProductsAdminQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-products-admin', params],
    queryFn: () => api.product.listProductsAdmin(params),
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(productAdminParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.searchKey, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openEditProductForm = (id: string) =>
    openModal(<ProductAdminForm productId={id} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditProductForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const products = data?.products;

  return (
    <Container>
      <Card>
        <div className="flex gap-4">
          <TextInput
            type="search"
            name="search"
            label="Search Products"
            control={control}
            invalidText={errors?.search?.message}
          />
          <SelectInput
            name="searchKey"
            label="Search By"
            options={
              new Map([
                ['name', 'Product Name'],
                ['store.name', 'Store Name'],
              ])
            }
            control={control}
            invalidText={errors?.statusFilter?.message}
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
      </Card>
    </Container>
  );
};
