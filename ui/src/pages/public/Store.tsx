import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse } from '../../../../api/src/types/api';
import { Cart, Loader } from '../../components/core';
import { BannerImage } from '../../components/display';
import { HTTP_METHOD } from '../../constants';
import { CartProvider } from '../../context/CartContext';
import useApi from '../../hooks/useApi';

type Props = {};

export const Store: React.FC<Props> = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse>(
    {
      url: `/store/${storeId}`,
      method: HTTP_METHOD.GET,
    },
    { isPrivateEndpoint: false },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const store = response?.store;

  return (
    <CartProvider>
      <div className="flex flex-col h-screen">
        <div className="relative flex h-40 items-end justify-center">
          <BannerImage className="absolute top-0 left-0" image={store?.bannerImage} name={store!.name} />
          <p className='store-name text-shadow z-10'>{store?.name}</p>
        </div>
        <div className='flex flex-1'>
          <Outlet />
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
};
