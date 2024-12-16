import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  storeDashboardFormSchema,
  StoreDashboardFormType,
} from '../../../config/forms/store-dashboard-form';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Separator } from '../../display';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  storeId?: string;
};

export const StoreDashboardForm: React.FC<Props> = ({ storeId }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-store-dashboard', storeId],
    queryFn: () => api.store.getStoreDashboard(storeId),
  });

  const updateStoreMutation = useMutation({
    mutationFn: api.store.updateStoreDashboard,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Store updated successfully',
      });
      queryClient.refetchQueries({ queryKey: ['get-breadcrumb-dashboard'] });
      queryClient.refetchQueries({ queryKey: ['list-stores-dashboard'] });
      queryClient.refetchQueries({
        queryKey: ['get-store-dashboard', storeId],
      });
      closeModal();
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(storeDashboardFormSchema),
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

  const onSubmit = async (store: StoreDashboardFormType) =>
    updateStoreMutation.mutate({ storeId: storeId!, storeUpdate: store });

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      className="flex flex-col flex-1 gap-4 overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <H3>{storeId ? 'Edit' : 'New'} Store</H3>
      <Separator />
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
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
      </div>
      {formError && <ErrorText>{formError}</ErrorText>}
      <Separator />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !isDirty}>
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
