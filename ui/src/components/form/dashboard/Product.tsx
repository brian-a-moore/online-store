import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetProductDashboardBody,
  GetProductDashboardQuery,
  GetProductDashboardResponse,
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { DEFAULT_FORM_VALUES, productDashboardFormSchema, ProductDashboardFormType } from '../../../config/forms/product-dashboard-form';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { Loader } from '../../core';
import { Separator } from '../../display';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  storeId?: string;
  productId?: string;
  forceReload: () => void;
};

export const ProductDashboardForm: React.FC<Props> = ({ storeId, productId, forceReload }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<
    GetProductDashboardBody,
    GetProductDashboardQuery,
    GetProductDashboardResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/dashboard/product/${productId}`,
    },
    { isAutoTriggered: !!productId },
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(productDashboardFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.product) {
      setValue('name', response.product.name);
      if (response.product?.description) setValue('description', response.product.description);
      setValue('isPublished', response.product.isPublished);
    }
  }, [response]);

  const onSubmit = async (product: ProductDashboardFormType) => {
    try {
      if (productId) {
        await api.dashboard.updateProduct(productId!, product);
        setToast({ type: 'success', message: 'Product updated successfully' });
      } else {
        await api.dashboard.createProduct(storeId!, product);
        setToast({ type: 'success', message: 'Product created successfully' });
      }
      closeModal();
      forceReload();
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col flex-1 gap-4 overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
      <H3>{productId ? 'Edit' : 'New'} Product</H3>
      <Separator />
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />
        <TextAreaInput
          name="description"
          label="Description"
          control={control}
          invalidText={errors?.description?.message}
        />
        <SwitchInput name="isPublished" label="Public" control={control} invalidText={errors.isPublished?.message} />
      </div>
      {formError && <ErrorText>{formError}</ErrorText>}
      <Separator />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (productId ? 'Updating' : 'Creating') : productId ? 'Update' : 'Create'} Product
        </Button>
      </div>
    </form>
  );
};
