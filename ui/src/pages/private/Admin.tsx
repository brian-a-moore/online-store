import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

type Props = {};

export const Admin: React.FC<Props> = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Admin</h1>
        <Outlet />
      </div>
    </AuthProvider>
  );
};
