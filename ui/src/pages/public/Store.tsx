import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse } from '../../../../api/src/types/api';
import { Cart } from '../../components/core';
import { HTTP_METHOD } from '../../constants';
import { CartProvider } from '../../context/CartContext';
import useApi from '../../hooks/useApi';

type Props = {};

export const Store: React.FC<Props> = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate  = useNavigate();

  const { error, isLoading, response } = useApi<GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse>({
    url: `/store/${storeId}`,
    method: HTTP_METHOD.GET
  }, { isPrivateEndpoint: false });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className='flex flex-col'>
      <CartProvider>
        <Outlet />
        <Cart />
      </CartProvider>
    </div>
  );
};
