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
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  itemAdminFormSchema,
  ItemAdminFormType,
} from '../../../config/forms/item-admin-form';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { H3 } from '../../typography';

type Props = {
  itemId: string;
  forceReload: () => void;
};

export const ItemAdminForm: React.FC<Props> = ({ itemId, forceReload }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
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
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(itemAdminFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.item) {
      setValue('name', response.item.name);
      if (response.item?.description)
        setValue('description', response.item.description);
      setValue('isPublished', response.item.isPublished);
    }
  }, [response]);

  const onSubmit = async (item: ItemAdminFormType) => {
    try {
      await api.admin.updateItem(itemId, item);
      closeModal();
      forceReload();
      setToast({ type: 'success', message: 'Item updated successfully' });
    } catch (error: any | unknown) {
      navigate(
        `/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`,
      );
    }
  };

  const openDeleteItemDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.admin.deleteItem(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Item deleted successfully' });
      } catch (error: any | unknown) {
        navigate(
          `/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`,
        );
      }
    };
    openModal(
      <>
        <H3>Delete Item</H3>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Item
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>Edit Item</H3>
        {itemId ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Delete Item"
              onClick={() => openDeleteItemDialog(itemId)}
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <TextInput
        name="name"
        label="Name"
        control={control}
        invalidText={errors?.name?.message}
      />
      <TextAreaInput
        name="description"
        label="Description"
        control={control}
        invalidText={errors?.description?.message}
      />
      <SwitchInput
        name="isPublished"
        label="Public"
        control={control}
        invalidText={errors.isPublished?.message}
      />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating' : 'Update'} Item
        </Button>
      </div>
    </form>
  );
};
