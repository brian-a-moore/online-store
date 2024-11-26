import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetProductAdminBody,
  GetProductAdminQuery,
  GetProductAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  productId: string;
};

export const ProductForm: React.FC<Props> = ({ productId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
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

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openDeleteProductDialog = (id: string) => {
    openModal(
      <>
        <H3>Delete Product</H3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeModal}>
            Delete Product
          </Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4">
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
      <p>{JSON.stringify(response?.product)}</p>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>Update Product</Button>
      </div>
    </form>
  );
};
