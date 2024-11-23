import { mdiHome, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '../../components/container';
import { Button, ButtonLink, Link } from '../../components/interactive';
import { H3, H5 } from '../../components/typography';
import { AuthContext } from '../../context/AuthContext';

type AdminLayoutProps = {};

export const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const { setUser } = useContext(AuthContext);

  const signOut = () => {
    setUser(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-slate-600 flex items-center justify-between p-4">
        <div className="flex gap-4 items-center">
          <ButtonLink href=".">
            <Icon path={mdiHome} size={1} color="white" />
          </ButtonLink>
          <H5 className="text-white">Store Manager</H5>
        </div>
        <Button onClick={signOut} className="flex gap-2 items-center">
          <p className="text-sm">Sign Out</p>
          <Icon path={mdiLogout} size={0.75} className="opacity-50" />
        </Button>
      </header>
      <Outlet />
    </div>
  );
};

type AdminHomeProps = {};

export const AdminHome: React.FC<AdminHomeProps> = () => {
  return (
    <div className="grid gap-4 p-4 mx-auto w-full max-w-[1280px] grid-cols-1 sm:grid-cols-2">
      <Card>
        <H3>Manage Stores</H3>
        <hr />
        <p>View and manage stores for your organization.</p>
        <Link href="store/list">Manage Stores</Link>
      </Card>
      <Card>
        <H3>Manage Users</H3>
        <hr />
        <p>View and manage users for your organization.</p>
        <Link href="user/list">Manage Users</Link>
      </Card>
    </div>
  );
};
