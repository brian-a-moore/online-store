import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { getStore, TStore } from '../../api';
import { Cart } from '../../components/core';
import { CartProvider } from '../../context/CartContext';
import { Items } from './Items';
import { OrderCancelled } from './OrderCancelled';
import { OrderSuccess } from './OrderSuccess';
import Products from './Products';

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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) navigate(`/500?error=${error}`);

  console.log({ store })

  return (
    <div className='flex flex-col'>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Products storeId={storeId!} />} />
          <Route path="product/:productId" element={<Items />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/cancelled" element={<OrderCancelled />} />
        </Routes>
        <Cart />
      </CartProvider>
    </div>
  );
};
