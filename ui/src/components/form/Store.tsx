import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetStoreAdminBody,
  GetStoreAdminQuery,
  GetStoreAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import { EDIT_STORE_FORM_INITIAL_VALUES } from '../../forms/store';
import { EditSelfFormSchema } from '../../forms/superuser';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { TextInput } from '../input';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  storeId?: string;
};

export const StoreForm: React.FC<Props> = ({ storeId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetStoreAdminBody,
    GetStoreAdminQuery,
    GetStoreAdminResponse
  >(
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
    resolver: zodResolver(EditSelfFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if(response?.store) {
      setValue('name', response.store.name);
      if(response.store?.description) setValue('description', response.store.description);
      if(response.store?.website) setValue('website', response.store.website);
    }
  }, [response]);

  const onSubmit = async (data: any) => {};

  const openDeleteStoreDialog = (id: string) => {
    openModal(
      <>
        <H3>Delete Store</H3>
        <p>Are you sure you want to delete this store?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeModal}>
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
      <TextInput
        name="name"
        label="Name"
        control={control}
        invalidText={errors?.name?.message}
      />

      <TextInput
        name="description"
        label="Description"
        control={control}
        invalidText={errors?.name?.message}
        maxRows={5}
        multiline
      />
      <TextInput
        name="website"
        label="Website"
        control={control}
        invalidText={errors?.name?.message}
      />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>{storeId ? 'Update' : 'Create'} Store</Button>
      </div>
    </form>
  );
};
