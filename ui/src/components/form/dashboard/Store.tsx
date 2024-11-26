import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { GetStoreDashboardBody, GetStoreDashboardQuery, GetStoreDashboardResponse } from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { Loader } from '../../core';
import { Separator } from '../../display';
import { ErrorText, SwitchInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { H3 } from '../../typography';

type EditStoreForm = {
  name: string;
  description: string;
  website: string;
  isPublished: boolean;
};

type Props = {
  storeId?: string;
  forceReload: () => void;
};

const EDIT_STORE_FORM_INITIAL_VALUES: EditStoreForm = {
  name: '',
  description: '',
  website: '',
  isPublished: false,
};

const EditStoreFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    website: z.string().min(0).max(256),
    isPublished: z.boolean(),
  })
  .strict();

export const StoreDashboardForm: React.FC<Props> = ({ storeId, forceReload }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetStoreDashboardBody, GetStoreDashboardQuery, GetStoreDashboardResponse>(
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
      if (storeId) {
        await api.admin.updateStore(storeId, store);
      } else {
        await api.admin.createStore(store);
      }
      closeModal();
      forceReload();
      setToast({ type: 'success', message: 'Store updated successfully' });
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col flex-1 gap-4 overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
      <H3>{storeId ? 'Edit' : 'New'} Store</H3>
      <Separator  />
      <div className='flex flex-col flex-1 gap-4 overflow-y-auto'>
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
      </div>
      {formError && <ErrorText>{formError}</ErrorText>}
      <Separator  />
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
