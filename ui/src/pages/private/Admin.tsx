import { Outlet } from 'react-router-dom';

type Props = {};

export const Admin: React.FC<Props> = () => {
  return (
      <div>
        <h1>Admin</h1>
        <Outlet />
      </div>
  );
};
