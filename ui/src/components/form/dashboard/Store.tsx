import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetStoreDashboardBody,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  storeDashboardFormSchema,
  StoreDashboardFormType,
} from '../../../config/forms/store-dashboard-form';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
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

  const { error, isLoading, response } = useApi<
    GetStoreDashboardBody,
    GetStoreDashboardQuery,
    GetStoreDashboardResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/dashboard/store/${storeId}`,
    },
    { isAutoTriggered: !!storeId },
  );

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
    if (response?.store) {
      setValue('name', response.store.name);
      if (response.store?.description)
        setValue('description', response.store.description);
      setValue('isPublished', response.store.isPublished);
    }
  }, [response]);

  const onSubmit = async (store: StoreDashboardFormType) => {
    try {
      await api.dashboard.updateStore(storeId!, store);
      closeModal();
      setToast({ type: 'success', message: 'Store updated successfully' });
    } catch (error: any | unknown) {
      setFormError(
        error?.response?.data?.message ||
          'An unknown error occurred: Please try again later.',
      );
    }
  };

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
