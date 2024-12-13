import { mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
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
  const { closeModal, openModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.domain !== 'user') {
      navigate('/404');
    }
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const signOut = () => {
    openModal(
      <>
        <H3>Sign Out</H3>
        <p>Are you sure you want to sign out?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              closeModal();
              setToast({ message: 'You have signed out successfully', type: 'success' });
              deleteAuthToken();
              setUser(null);
            }}
          >
            Sign Out
          </Button>
        </div>
      </>,
    );
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col">
      <header className="bg-slate-600 !text-white flex items-center p-4 justify-between">
        <H5>Dashboard</H5>
        <Button onClick={signOut} title="Sign Out">
          <Icon path={mdiLogout} size={1} />
        </Button>
      </header>
      <BreadCrumb />
      <main className="flex flex-col p-4 gap-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
