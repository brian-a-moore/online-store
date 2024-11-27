import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { GetProductDashboardBody, GetProductDashboardQuery, GetProductDashboardResponse } from '../../../../../api/src/types/api';
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

type EditProductForm = {
  name: string;
  description: string;
  isPublished: boolean;
};

type Props = {
  storeId?: string;
  productId?: string;
  forceReload: () => void;
};

const EDIT_PRODUCT_FORM_INITIAL_VALUES: EditProductForm = {
  name: '',
  description: '',
  isPublished: false,
};

const EditProductFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();

export const ProductDashboardForm: React.FC<Props> = ({ storeId, productId, forceReload }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetProductDashboardBody, GetProductDashboardQuery, GetProductDashboardResponse>(
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
    defaultValues: EDIT_PRODUCT_FORM_INITIAL_VALUES,
    resolver: zodResolver(EditProductFormSchema),
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

  const onSubmit = async (product: EditProductForm) => {
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
      <SwitchInput name="isPublished" label="Public" control={control} />
      </div>
      {formError && <ErrorText>{formError}</ErrorText>}
      <Separator  />
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
