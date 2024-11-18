import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, ButtonLink } from '../../components/interactive';
import { AuthContext } from '../../context/AuthContext';

type AdminLayoutProps = {};

export const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { setUser } = useContext(AuthContext);

  const signOut = () => {
    setUser(null);
  };

  return (
      <div className='flex flex-col h-screen overflow-hidden'>
        <header className='bg-teal-600 flex items-center justify-between p-4'>
          <div className='flex gap-4 items-center'>
            <ButtonLink href='.'>Home</ButtonLink>
            <h1 className='text-white'>Admin</h1>
          </div>
          <Button onClick={signOut}>Sign Out</Button>
        </header>
        <div className='flex-1 bg-red-100 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
  );
};

type AdminHomeProps = {};

export const AdminHome: React.FC<AdminHomeProps> = () => {
  return(
    <div className='flex w-full h-full items-center justify-center p-4 gap-4'>
      <ButtonLink href="store/list">Manage Stores</ButtonLink>
      <ButtonLink href="user/list">Manage Users</ButtonLink>
    </div>
  )
};
