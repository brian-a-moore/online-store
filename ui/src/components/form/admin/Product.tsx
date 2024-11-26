import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  GetProductAdminBody,
  GetProductAdminQuery,
  GetProductAdminResponse,
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { Loader } from '../../core';
import { SwitchInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { H3 } from '../../typography';

type EditProductForm = {
  name: string;
  description: string;
  isPublished: boolean;
};

type Props = {
  productId: string;
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

export const ProductAdminForm: React.FC<Props> = ({ productId, forceReload }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetProductAdminBody,
    GetProductAdminQuery,
    GetProductAdminResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/product/${productId}`,
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
        await api.admin.updateProduct(productId, product);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Product updated successfully' });
    } catch (error: any | unknown) {
      navigate(`/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`);
    }
  };

  const openDeleteProductDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.admin.deleteProduct(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Product deleted successfully' });
      } catch (error: any | unknown) {
        navigate(`/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`);
      }
    };
    openModal(
      <>
        <H3>Delete Product</H3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Product
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>Edit Product</H3>
        {productId ? (
          <div className="flex gap-4">
            <Button variant="secondary" title="Delete Product" onClick={() => openDeleteProductDialog(productId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
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
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
         {isSubmitting ? 'Updating' : 'Update'} Product
        </Button>
      </div>
    </form>
  );
};
