import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetItemDashboardResponse } from '../../../../../../api/src/types/api';
import { api } from '../../../../api';
import {
  DEFAULT_FORM_VALUES_VARIABLE,
  variableItemDashboardFormSchema,
  VariableItemDashboardFormType,
} from '../../../../config/forms/item-dashboard-form';
import { ModalContext } from '../../../../context/ModalContext';
import { ToastContext } from '../../../../context/ToastContext';
import { FormOverflow } from '../../../container';
import { Separator } from '../../../display';
import {
  PresetAmounts,
  SwitchInput,
  TextAreaInput,
  TextInput,
} from '../../../input';
import { Button } from '../../../interactive';
import { ErrorText } from '../../../typography';

type Props = {
  item?: GetItemDashboardResponse['item'];
  productId: string;
};

export const VariableItemForm: React.FC<Props> = ({ item, productId }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  const createItemMutation = useMutation({
    mutationFn: api.item.createItemDashboard,
    onError: (error) => {
      setFormError(error?.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Item created successfully',
      });
      queryClient.refetchQueries({
        queryKey: ['list-items-dashboard'],
      });
      closeModal();
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: api.item.updateItemDashboard,
    onError: (error) => {
      setFormError(error?.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Item updated successfully',
      });
      queryClient.refetchQueries({ queryKey: ['get-breadcrumb-dashboard'] });
      queryClient.refetchQueries({ queryKey: ['list-items-dashboard'] });
      queryClient.refetchQueries({
        queryKey: ['get-item-dashboard', item!.id],
      });
      closeModal();
    },
  });

  const onSubmit = async (data: VariableItemDashboardFormType) => {
    if (item?.id)
      return updateItemMutation.mutate({ itemId: item.id, itemUpdate: data });
    createItemMutation.mutate({ productId, newItem: data });
  };

  const config = watch('config');

  const defaultValues = !item ? [] : JSON.parse(item.config).presetAmounts;

  return (
    <form
      className="flex flex-col gap-4 overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormOverflow>
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
        <TextInput
          type="number"
          name="maxQuantityPerOrder"
          label="Max Quantity Per Order"
          control={control}
          invalidText={errors?.maxQuantityPerOrder?.message}
        />
        <SwitchInput
          name="isPublished"
          label="Public"
          control={control}
          invalidText={errors.isPublished?.message}
        />
        <div className="flex gap-4">
          <TextInput
            type="number"
            name="config.defaultAmount"
            label="Default Amount"
            control={control}
            invalidText={errors?.config?.defaultAmount?.message}
          />
          <TextInput
            type="number"
            name="config.minAmount"
            label="Minimum Amount"
            control={control}
            invalidText={errors?.config?.minAmount?.message}
          />
          <TextInput
            type="number"
            name="config.maxAmount"
            label="Maximum Amount"
            control={control}
            invalidText={errors?.config?.maxAmount?.message}
          />
        </div>
        <PresetAmounts
          onChange={(presetAmounts: number[]) =>
            setValue('config.presetAmounts', presetAmounts)
          }
          config={config as any}
          defaultValues={defaultValues}
        />
      </FormOverflow>
      {formError ? <ErrorText>{formError}</ErrorText> : null}
      <Separator />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? productId
              ? 'Updating'
              : 'Creating'
            : productId
              ? 'Update'
              : 'Create'}{' '}
          Item
        </Button>
      </div>
    </form>
  );
};
