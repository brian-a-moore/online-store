import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetItemDashboardResponse } from '../../../../../../api/src/types/api';
import { api } from '../../../../api';
import {
  DEFAULT_FORM_VALUES_FIXED,
  fixedItemDashboardFormSchema,
  FixedItemDashboardFormType,
} from '../../../../config/forms/item-dashboard-form';
import { ModalContext } from '../../../../context/ModalContext';
import { ToastContext } from '../../../../context/ToastContext';
import { FormOverflow } from '../../../container';
import { Separator } from '../../../display';
import { SwitchInput, TextAreaInput, TextInput } from '../../../input';
import { Button } from '../../../interactive';
import { ErrorText } from '../../../typography';

type Props = {
  item?: GetItemDashboardResponse['item'];
  productId: string;
};

export const FixedItemForm: React.FC<Props> = ({ item, productId }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES_FIXED,
    resolver: zodResolver(fixedItemDashboardFormSchema),
  });

  useEffect(() => {
    if (item) {
      const parsedConfig = JSON.parse(item.config);
      setValue('name', item.name);
      setValue('description', item.description || '');
      setValue('config', parsedConfig);
      setValue('isPublished', item.isPublished);
      setValue('maxQuantityPerOrder', item.maxQuantityPerOrder);
    }
  }, [item]);

  const onSubmit = async (data: FixedItemDashboardFormType) => {
    try {
      if (item?.id) {
        await api.dashboard.updateItem(item.id, data);
        setToast({ type: 'success', message: 'Item updated successfully' });
      } else {
        await api.dashboard.createItem(productId, data);
        setToast({ type: 'success', message: 'Item created successfully' });
      }
      closeModal();
    } catch (error: any | unknown) {
      setFormError(error.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  const isRedeemable = watch('config.isRedeemable');

  return (
    <form className="flex flex-col gap-4 overflow-auto" onSubmit={handleSubmit(onSubmit)}>
      <FormOverflow>
        <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />
        <TextAreaInput
          name="description"
          label="Description"
          control={control}
          invalidText={errors?.description?.message}
        />
        <TextInput
          type="number"
          name="config.price"
          label="Price"
          control={control}
          invalidText={errors?.config?.price?.message}
        />
        <TextInput
          type="number"
          name="maxQuantityPerOrder"
          label="Max Quantity Per Order"
          control={control}
          invalidText={errors?.maxQuantityPerOrder?.message}
        />
        <SwitchInput name="isPublished" label="Public" control={control} invalidText={errors.isPublished?.message} />
        <div className="flex gap-4 items-center justify-between">
          <SwitchInput
            name="config.isRedeemable"
            label="Redeemable"
            control={control}
            invalidText={errors.config?.isRedeemable?.message}
          />
          {isRedeemable ? (
            <TextInput
              type="date"
              name="config.redeemByDate"
              label="Redeem By Date"
              control={control}
              invalidText={errors?.config?.redeemByDate?.message}
            />
          ) : null}
        </div>
      </FormOverflow>
      {formError ? <ErrorText>{formError}</ErrorText> : null}
      <Separator />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (item?.id ? 'Updating' : 'Creating') : item?.id ? 'Update' : 'Create'} Item
        </Button>
      </div>
    </form>
  );
};
