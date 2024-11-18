import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toast } from './components/core';
import { ToastContext } from './context/ToastContext';
import { Items as AdminItems, Products as AdminProducts, Dashboard, Stores, Users } from './pages/private';
import { Admin } from './pages/private/Admin';
import { Home, Items, Login, OrderCancelled, OrderSuccess, PageNotFound, Products, ServerError, Store } from './pages/public';

function App() {
  const { toast } = useContext(ToastContext);
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path="store/:storeId" element={<Store />}>
          <Route index element={<Products />} />
          <Route path="product/:productId" element={<Items />} />
          <Route path="order/success" element={<OrderSuccess />} />
          <Route path="order/cancelled" element={<OrderCancelled />} />
        </Route>
        <Route path='admin' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='items' element={<AdminItems />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='stores' element={<Stores />} />
          <Route path='users' element={<Users />} />
        </Route>
        <Route path="404" element={<PageNotFound />} />
        <Route path="500" element={<ServerError />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default App;
