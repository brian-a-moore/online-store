import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, PageNotFound, ServerError, Store } from './pages/public';

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/store/:storeId/*" element={<Store />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
