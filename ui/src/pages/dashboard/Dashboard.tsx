import { mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../../components/core/Breadcrumb';
import { Button } from '../../components/interactive';
import { H3, H5 } from '../../components/typography';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import { deleteAuthToken } from '../../utils/localStorage';

export const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const signOut = () => {
    openModal(<>
      <H3>Sign Out</H3>
      <p>Are you sure you want to sign out?</p>
      <div className="flex justify-between">
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='destructive' onClick={() => {
          closeModal();
          setToast({ message: 'You have signed out successfully', type: 'success' });
          deleteAuthToken();
          setUser(null);
        }}>Sign Out</Button>
      </div>
    </>);
  };

  if(user?.domain !== 'user') {
    navigate('/404');
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-slate-600 flex items-center justify-between p-4">
        <H5 className="text-white">Store Dashboard</H5>
        <Button onClick={signOut} className="flex gap-2 items-center">
          <p className="text-sm">Sign Out</p>
          <Icon path={mdiLogout} size={0.75} className="opacity-50" />
        </Button>
      </header>
      <BreadCrumb />
      <Outlet />
    </div>
  );
};
