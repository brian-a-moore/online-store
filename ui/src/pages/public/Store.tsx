import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getStore, TStore } from '../../api';
import { Cart } from '../../components/core';
import { CartProvider } from '../../context/CartContext';

type Props = {};

export const Store: React.FC<Props> = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate  = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [store, setStore] = useState<TStore | null>(null);

  useEffect(() => {
    try {
      const fetchStore = async () => {
        try {
          const { store } = await getStore(storeId!);
          setStore(store);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchStore();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  console.log({ store })

  return (
    <div className='flex flex-col'>
      <CartProvider>
        <Outlet />
        <Cart />
      </CartProvider>
    </div>
  );
};
