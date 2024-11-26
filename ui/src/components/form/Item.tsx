import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetItemAdminBody,
  GetItemAdminQuery,
  GetItemAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import { EDIT_ITEM_FORM_INITIAL_VALUES, EditItemFormSchema } from '../../forms/item';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { SwitchInput, TextInput } from '../input';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  itemId: string;
};

export const ItemForm: React.FC<Props> = ({ itemId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetItemAdminBody,
    GetItemAdminQuery,
    GetItemAdminResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/item/${itemId}`,
    },
    { isAutoTriggered: !!itemId },
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EDIT_ITEM_FORM_INITIAL_VALUES,
    resolver: zodResolver(EditItemFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.item) {
      setValue('name', response.item.name);
      if (response.item?.description) setValue('description', response.item.description);
      setValue('isPublished', response.item.isPublished);
    }
  }, [response]);

  const onSubmit = async (data: any) => {};

  const openDeleteItemDialog = (id: string) => {
    openModal(
      <>
        <H3>Delete Item</H3>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeModal}>
            Delete Item
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>Edit Item</H3>
        {itemId ? (
          <div className="flex gap-4">
            <Button variant="secondary" title="Delete Item" onClick={() => openDeleteItemDialog(itemId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />
      <TextInput
        name="description"
        label="Description"
        control={control}
        invalidText={errors?.description?.message}
        maxRows={5}
        multiline
      />
      <SwitchInput name="isPublished" label="Public" control={control} />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
         {isSubmitting ? 'Updating' : 'Update'} Item
        </Button>
      </div>
    </form>
  );
};
