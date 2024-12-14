import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Modal, Toast } from './components/core';
import { ModalContext } from './context/ModalContext';
import { ToastContext } from './context/ToastContext';
import {
  Admin,
  HomeAdmin,
  ItemsAdmin,
  ProductsAdmin,
  StoresAdmin,
  SuperusersAdmin,
  UsersAdmin,
} from './pages/admin';
import {
  Dashboard,
  HomeDashboard,
  ItemDashboard,
  ProductDashboard,
  StoreDashboard,
} from './pages/dashboard';
import {
  Home,
  Items,
  Login,
  PageNotFound,
  Products,
  ServerError,
  Store,
} from './pages/public';

function App() {
  const { modal } = useContext(ModalContext);
  const { toast } = useContext(ToastContext);

  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Admin Pages */}
        <Route path="admin" element={<Admin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="items" element={<ItemsAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="stores" element={<StoresAdmin />} />
          <Route path="superusers" element={<SuperusersAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
        </Route>

        {/* Dashboard Pages */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
          <Route path="store/:storeId" element={<StoreDashboard />} />
          <Route
            path="store/:storeId/product/:productId"
            element={<ProductDashboard />}
          />
          <Route
            path="store/:storeId/product/:productId/item/:itemId"
            element={<ItemDashboard />}
          />
        </Route>

        {/* Public Store Pages */}
        <Route path="store/:storeId" element={<Store />}>
          <Route index element={<Products />} />
          <Route path="product/:productId/items" element={<Items />} />
        </Route>

        {/* Error Pages */}
        <Route path="404" element={<PageNotFound />} />
        <Route path="500" element={<ServerError />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Modal modal={modal} />
      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default App;
