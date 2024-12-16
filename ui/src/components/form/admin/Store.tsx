import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  storeAdminFormSchema,
  StoreAdminFormType,
} from '../../../config/forms/store-admin-form';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  storeId?: string;
};

export const StoreAdminForm: React.FC<Props> = ({ storeId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-store-admin', storeId],
    queryFn: () => api.store.getStoreAdmin(storeId),
    enabled: !!storeId,
  });

  const createStoreMutation = useMutation({
    mutationFn: api.store.createStoreAdmin,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Store created successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-stores-admin'] });
      closeModal();
    },
  });

  const updateStoreMutation = useMutation({
    mutationFn: api.store.updateStoreAdmin,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Store created successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-stores-admin'] });
      closeModal();
    },
  });

  const deleteStoreMutation = useMutation({
    mutationFn: api.store.deleteStoreAdmin,
    onError: (error) => {
      setFormError(error?.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Store deleted successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-stores-admin'] });
      closeModal();
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(storeAdminFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (data?.store) {
      setValue('name', data.store.name);
      if (data.store?.description)
        setValue('description', data.store.description);
      setValue('isPublished', data.store.isPublished);
    }
  }, [data]);

  const onSubmit = async (store: StoreAdminFormType) => {
    if (storeId) {
      return updateStoreMutation.mutate({
        storeId,
        storeUpdate: store,
      });
    } else {
      return createStoreMutation.mutate(store);
    }
  };

  const openDeleteStoreDialog = (id: string) => {
    const onClick = () => deleteStoreMutation.mutate(id);
    openModal(
      <>
        <H3>Delete Store</H3>
        <p>Are you sure you want to delete this store?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Store
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{storeId ? 'Edit' : 'New'} Store</H3>
        {storeId ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Delete Store"
              onClick={() => openDeleteStoreDialog(storeId)}
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
        invalidText={errors?.isPublished?.message}
      />
      {formError && <ErrorText>{formError}</ErrorText>}
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? storeId
              ? 'Updating'
              : 'Creating'
            : storeId
              ? 'Update'
              : 'Create'}{' '}
          Store
        </Button>
      </div>
    </form>
  );
};
