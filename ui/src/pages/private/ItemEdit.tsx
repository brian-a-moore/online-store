import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createItemSchema } from '../../../../api/src/schemas/item';
import { CreateItemBody, GetItemBody, GetItemQuery, GetItemResponse } from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { SelectInput, TextInput } from '../../components/form';
import { Button } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const DEFAULT_VALUES: Omit<CreateItemBody, 'config'> = {
  name: '',
  itemTypeId: 0,
  description: '',
  maxQuantityPerOrder: 0,
};

export const ItemEdit: React.FC = () => {
  const { setModal } = useContext(ModalContext);
  const { storeId, productId, itemId } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetItemBody, GetItemQuery, GetItemResponse>(
    {
      url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
      method: HTTP_METHOD.GET,
    },
    { isAutoTriggered: !!itemId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(createItemSchema.body),
  });

  useEffect(() => {
    if (response?.item) {
      setValue('name', response.item.name);
      setValue('itemTypeId', response.item.itemTypeId);
      if (response.item.description) setValue('description', response.item.description);
      setValue('maxQuantityPerOrder', response.item.maxQuantityPerOrder);
    }
  }, [JSON.stringify(response), setValue]);

  const onSubmit: any = async (newItem: CreateItemBody) => {};

  if (isLoading) return <Loader />;

  return (
    <Page>
      <Container>
        <Card>
          <div className="flex justify-between">
            <H2>{itemId ? 'Edit' : 'New'} Item</H2>
            {itemId ? (
              <Button
                variant="destructive"
                title="Delete Item"
                onClick={() =>
                  setModal({
                    title: 'Delete Item',
                    Body: (
                      <p>
                        Deleting an item will remove all the items data, including its sales and history. This is
                        immediate and unrecoverable. Are you sure you want to delete this item?
                      </p>
                    ),
                    ActionBar: [
                      <Button variant="secondary" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button variant="destructive" onClick={() => {}}>
                        Delete Item
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
            ) : null}
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />

            <SelectInput
              name="itemTypeId"
              label="Item Type"
              options={
                new Map([
                  [0, 'Fixed Price'],
                  [1, 'Variable Price'],
                ])
              }
              control={control}
            />

            <TextInput
              name="description"
              label="Description"
              control={control}
              invalidText={errors?.description?.message}
              multiline
              maxRows={5}
            />
            <hr />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving Item...' : 'Save Item'}
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </Page>
  );
};
