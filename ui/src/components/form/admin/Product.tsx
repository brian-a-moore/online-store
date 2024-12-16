import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  productAdminFormSchema,
  ProductAdminFormType,
} from '../../../config/forms/product-admin-form';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { SwitchInput, TextAreaInput, TextInput } from '../../input';
import { Button } from '../../interactive';
import { H3 } from '../../typography';

type Props = {
  productId: string;
};

export const ProductAdminForm: React.FC<Props> = ({ productId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-product-admin', productId],
    queryFn: () => api.product.getProductAdmin(productId),
  });

  const updateProductMutation = useMutation({
    mutationFn: api.product.updateProductAdmin,
    onError: (error) => {
      navigate(`/500?error=${error.message || 'An unknown error occurred'}`);
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Product created successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-products-admin'] });
      closeModal();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: api.product.deleteProductAdmin,
    onError: (error) => {
      navigate(`/500?error=${error.message || 'An unknown error occurred'}`);
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Product deleted successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-products-admin'] });
      closeModal();
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(productAdminFormSchema),
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

  const onSubmit = (product: ProductAdminFormType) =>
    updateProductMutation.mutate({ productId, productUpdate: product });

  const openDeleteProductDialog = (id: string) => {
    const onClick = () => deleteProductMutation.mutate(id);
    openModal(
      <>
        <H3>Delete Product</H3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Product
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>Edit Product</H3>
        {productId ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Delete Product"
              onClick={() => openDeleteProductDialog(productId)}
            >
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
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating' : 'Update'} Product
        </Button>
      </div>
    </form>
  );
};
