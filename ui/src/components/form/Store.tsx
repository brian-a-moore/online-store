import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GetStoreAdminBody, GetStoreAdminQuery, GetStoreAdminResponse } from '../../../../api/src/types/api';
import { api } from '../../api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import { EDIT_STORE_FORM_INITIAL_VALUES, EditStoreForm, EditStoreFormSchema } from '../../forms/store';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { SwitchInput, TextInput } from '../input';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  storeId?: string;
  forceReload: () => void;
};

export const StoreForm: React.FC<Props> = ({ storeId, forceReload }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetStoreAdminBody, GetStoreAdminQuery, GetStoreAdminResponse>(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/store/${storeId}`,
    },
    { isAutoTriggered: !!storeId },
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EDIT_STORE_FORM_INITIAL_VALUES,
    resolver: zodResolver(EditStoreFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.store) {
      setValue('name', response.store.name);
      if (response.store?.description) setValue('description', response.store.description);
      if (response.store?.website) setValue('website', response.store.website);
      setValue('isPublished', response.store.isPublished);
    }
  }, [response]);

  const onSubmit = async (store: EditStoreForm) => {
    try {
      let response;
      if (storeId) {
        response = await api.admin.updateStore(storeId, store);
      } else {
        response = await api.admin.createStore(store);
      }
      closeModal();
      forceReload();
      setToast({ type: 'success', message: 'Store updated successfully' });
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  const openDeleteStoreDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.admin.deleteStore(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Store deleted successfully' });
      } catch (error: any | unknown) {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    };
    openModal(
      <>
        <H3>Delete Store</H3>
        <p>Are you sure you want to delete this store?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Store
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{storeId ? 'Edit' : 'New'} Store</H3>
        {storeId ? (
          <div className="flex gap-4">
            <Button variant="secondary" title="Delete Store" onClick={() => openDeleteStoreDialog(storeId)}>
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
      <TextInput name="website" label="Website" control={control} invalidText={errors?.website?.message} />
      <SwitchInput name="isPublished" label="Public" control={control} />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (storeId ? 'Updating' : 'Creating') : storeId ? 'Update' : 'Create'} Store
        </Button>
      </div>
    </form>
  );
};
