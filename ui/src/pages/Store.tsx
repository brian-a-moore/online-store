import { Route, Routes, useParams } from 'react-router-dom';
import Cart from '../components/Cart';
import { CartProvider } from '../context/CartContext';
import Items from './Items';
import OrderCancelled from './OrderCancelled';
import OrderSuccess from './OrderSuccess';
import Products from './Products';

type Props = {};

const Store: React.FC<Props> = () => {
  const { storeId } = useParams<{ storeId: string }>();

  return (
    <CartProvider>
        <Routes>
          <Route path="/" element={<Products storeId={storeId!} />} />
          <Route path="product/:productId" element={<Items />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/cancelled" element={<OrderCancelled />} />
        </Routes>
        <Cart />
      </CartProvider>
  );
};

export default Store;
