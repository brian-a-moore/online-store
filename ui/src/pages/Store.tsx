import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { getStore, TStore } from '../api';
import { Card } from '../components/container';
import { Cart } from '../components/core';
import { Link } from '../components/interactive';
import { CartProvider } from '../context/CartContext';
import Items from './Items';
import OrderCancelled from './OrderCancelled';
import OrderSuccess from './OrderSuccess';
import Products from './Products';

type Props = {};

const Store: React.FC<Props> = () => {
  const { storeId } = useParams<{ storeId: string }>();

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
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className='flex flex-col p-4'>
      <Card className='mx-auto w-full max-w-[960px]'>
        {store?.storeHeroImage ? <img src={store?.storeHeroImage} alt={store?.storeName} className='h-60 object-cover rounded' /> : null}
        <h1 className='text-2xl font-bold'>{store?.storeName}</h1>
        <p className='max-w-[80ch]'>{store?.storeDescription}</p>
        <hr />
        <Link href={store?.storeWebsite!} target="_blank">Visit Website</Link>
      </Card>
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

export default Store;
