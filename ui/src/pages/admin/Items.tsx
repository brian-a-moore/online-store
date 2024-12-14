import { zodResolver } from '@hookform/resolvers/zod';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ListItemsAdminBody,
  ListItemsAdminQuery,
  ListItemsAdminResponse,
} from '../../../../api/src/types/api';
import { AgGrid, Card, Container } from '../../components/container';
import { ItemAdminForm } from '../../components/form';
import { SelectInput, TextInput } from '../../components/input';
import { EmptyText } from '../../components/typography';
import {
  DEFAULT_FORM_VALUES,
  itemAdminParamsFormSchema,
} from '../../config/forms/item-admin-params-form';
import { statusOptions } from '../../config/options';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import useDebounce from '../../hooks/useDebounce';

type Row = ListItemsAdminResponse['items'][0];

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Item Name',
    flex: 2,
  },
  {
    field: 'productName',
    headerName: 'Product Name',
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

export const ItemsAdmin: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string | undefined>();
  const [params, setParams] =
    useState<ListItemsAdminQuery>(DEFAULT_FORM_VALUES);

  const { error, isLoading, response } = useApi<
    ListItemsAdminBody,
    ListItemsAdminQuery,
    ListItemsAdminResponse
  >(
    {
      url: `/admin/item/list`,
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
    resolver: zodResolver(itemAdminParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.searchKey, form.statusFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditItemForm = (id: string) =>
    openModal(<ItemAdminForm itemId={id} forceReload={forceReload} />);
  const onRowClicked = (e: RowClickedEvent<Row>) =>
    openEditItemForm(e.data!.id);

  if (isLoading) return <p>Loading...</p>;

  const items = response?.items;

  return (
    <Container>
      <Card>
        <div className="flex gap-4">
          <TextInput
            type="search"
            name="search"
            label="Search Items"
            control={control}
            invalidText={errors?.search?.message}
          />
          <SelectInput
            name="searchKey"
            label="Search By"
            options={
              new Map([
                ['name', 'Item Name'],
                ['product.name', 'Product Name'],
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
        {items && items.length ? (
          <AgGrid<Row>
            cols={columns}
            rows={items}
            onRowClicked={onRowClicked}
          />
        ) : (
          <EmptyText className="text-center">No items found</EmptyText>
        )}
      </Card>
    </Container>
  );
};
