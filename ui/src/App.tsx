import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toast } from './components/core';
import { ToastContext } from './context/ToastContext';
import { ItemEdit, ItemHome, ItemLayout, ItemList, ProductEdit, ProductHome, ProductLayout, ProductList, StoreEdit, StoreHome, StoreLayout, StoreList } from './pages/private';
import { AdminHome, AdminLayout } from './pages/private/Admin';
import { UserEdit, UserHome, UserList } from './pages/private/User';
import { Home, Items, Login, OrderCancelled, OrderSuccess, PageNotFound, Products, ServerError, Store } from './pages/public';

function App() {
  const { toast } = useContext(ToastContext);
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='login' element={<Login />} />
        
        {/* Public Store Pages */}
        <Route path="store/:storeId" element={<Store />}>
          <Route index element={<Products />} />
          <Route path="product/:productId" element={<Items />} />
          <Route path="order/success" element={<OrderSuccess />} />
          <Route path="order/cancelled" element={<OrderCancelled />} />
        </Route>

        {/* Admin Pages */}
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          {/* Store Pages */}
          <Route path='store/list' element={<StoreList />} />
          <Route path='store/new' element={<StoreEdit />} />
          <Route path='store/:storeId' element={<StoreLayout />}>
            <Route index element={<StoreHome />} />
            <Route path='edit' element={<StoreEdit />} />
            {/* Product Pages */}
            <Route path='product/list' element={<ProductList />} />
            <Route path='product/new' element={<ProductEdit />} />
            <Route path='product/:productId' element={<ProductLayout />}>
              <Route index element={<ProductHome />} />
              <Route path='edit' element={<ProductEdit />} />
              {/* Item Pages */}
              <Route path='item/list' element={<ItemList />} />
              <Route path='item/new' element={<ItemEdit />} />
              <Route path='item/:itemId' element={<ItemLayout />}>
                <Route index element={<ItemHome />} />
                <Route path='edit' element={<ItemEdit />} />
              </Route>
            </Route>
          </Route>
          {/* User Pages */}
          <Route path='user/list' element={<UserList />} />
          <Route path='user/new' element={<UserEdit />} />
          <Route path='user/:userId' element={<UserHome />} />
          <Route path='user/:userId/edit' element={<UserEdit />} />

          {/* System Pages */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        {/* System Pages */}
        <Route path="404" element={<PageNotFound />} />
        <Route path="500" element={<ServerError />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default App;
