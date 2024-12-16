import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  productDashboardFormSchema,
  ProductDashboardFormType,
} from '../../../config/forms/product-dashboard-form';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Separator } from '../../display';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  storeId?: string;
  productId?: string;
};

export const ProductDashboardForm: React.FC<Props> = ({
  storeId,
  productId,
}) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-product-dashboard', productId],
    queryFn: () => api.product.getProductDashboard(productId),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(productDashboardFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (data?.product) {
      setValue('name', data.product.name);
      if (data.product?.description)
        setValue('description', data.product.description);
      setValue('isPublished', data.product.isPublished);
    }
  }, [data]);

  const onSubmit = async (product: ProductDashboardFormType) => {
    try {
      if (productId) {
        await api.product.updateProductDashboard(productId!, product);
        setToast({ type: 'success', message: 'Product updated successfully' });
      } else {
        await api.product.createProductDashboard(storeId!, product);
        setToast({ type: 'success', message: 'Product created successfully' });
      }
      closeModal();
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
      <H3>{productId ? 'Edit' : 'New'} Product</H3>
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
            ? productId
              ? 'Updating'
              : 'Creating'
            : productId
              ? 'Update'
              : 'Create'}{' '}
          Product
        </Button>
      </div>
    </form>
  );
};
