import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toast } from './components/core';
import Modal from './components/core/Modal';
import { ModalContext } from './context/ModalContext';
import { ToastContext } from './context/ToastContext';
import {
  Dashboard,
  HomeDashboard,
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
  Store
} from './pages/public';

function App() {
  const { modal } = useContext(ModalContext);
  const { toast } = useContext(ToastContext);
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Public Store Pages */}
        <Route path="store/:storeId" element={<Store />}>
          <Route index element={<Products />} />
          <Route path="product/:productId" element={<Items />} />
        </Route>

        {/* Dashboard Pages */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
          <Route path="store/:storeId" element={<StoreDashboard />} />
          <Route path="store/:storeId/product/:productId" element={<ProductDashboard />} />
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
