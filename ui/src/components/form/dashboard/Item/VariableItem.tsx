import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  GetItemDashboardResponse
} from '../../../../../../api/src/types/api';
import { api } from '../../../../api';
import { DEFAULT_FORM_VALUES_VARIABLE, variableItemDashboardFormSchema, VariableItemDashboardFormType } from '../../../../config/forms/item-dashboard-form';
import { ModalContext } from '../../../../context/ModalContext';
import { ToastContext } from '../../../../context/ToastContext';
import { FormOverflow } from '../../../container';
import { Separator } from '../../../display';
import { PresetAmounts, SwitchInput, TextAreaInput, TextInput } from '../../../input';
import { Button } from '../../../interactive';
import { ErrorText } from '../../../typography';

type Props = {
  item?: GetItemDashboardResponse['item'];
  productId: string;
  forceReload: () => void;
};

export const VariableItemForm: React.FC<Props> = ({ item, productId, forceReload }) => {
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
    defaultValues: DEFAULT_FORM_VALUES_VARIABLE,
    resolver: zodResolver(variableItemDashboardFormSchema),
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

  const onSubmit = async (data: VariableItemDashboardFormType) => {
    try {
      if (item?.id) {
        await api.dashboard.updateItem(item.id, data);
        setToast({ type: 'success', message: 'Item updated successfully' });
      } else {
        await api.dashboard.createItem(productId, data);
        setToast({ type: 'success', message: 'Item created successfully' });
      }
      closeModal();
      forceReload();
    } catch (error: any | unknown) {
      setFormError(error.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  const config = watch('config');

  const defaultValues = !item ? [] : JSON.parse(item.config).presetAmounts;

  return (
    <form className="flex flex-col gap-4 overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
      <FormOverflow>
        <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />
        <TextAreaInput
          name="description"
          label="Description"
          control={control}
          invalidText={errors?.description?.message}
        />
        <SwitchInput name="isPublished" label="Public" control={control} invalidText={errors.isPublished?.message} />
        <TextInput
          name="config.defaultAmount"
          label="Default Amount"
          control={control}
          invalidText={errors?.config?.defaultAmount?.message}
        />
        <div className="flex gap-4">
          <TextInput
            name="config.minAmount"
            label="Minimum Amount"
            control={control}
            invalidText={errors?.config?.minAmount?.message}
          />
          <TextInput
            name="config.maxAmount"
            label="Maximum Amount"
            control={control}
            invalidText={errors?.config?.maxAmount?.message}
          />
        </div>
        <PresetAmounts
          onChange={(presetAmounts: number[]) => setValue('config.presetAmounts', presetAmounts)}
          config={config as any}
          defaultValues={defaultValues}  
        />
      </FormOverflow>
      {formError ? <ErrorText>{formError}</ErrorText> : null}
      <Separator />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (productId ? 'Updating' : 'Creating') : productId ? 'Update' : 'Create'} Item
        </Button>
      </div>
    </form>
  );
};
