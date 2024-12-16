import {
  mdiAccount,
  mdiAccountPlus,
  mdiBarcode,
  mdiCloudQuestion,
  mdiLogout,
  mdiShieldAccount,
  mdiStore,
  mdiStorePlus,
  mdiTag,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StoreAdminForm, SuperuserAdminForm } from '../../components/form';
import { UserAdminForm } from '../../components/form/admin/User';
import { Button } from '../../components/interactive';
import { H3, H5 } from '../../components/typography';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import { deleteAuthToken } from '../../utils/localStorage';

const addableSegments = ['superusers', 'users', 'stores'];

const buttonLabel = new Map([
  ['superusers', { label: 'New Superuser', icon: mdiAccountPlus }],
  ['users', { label: 'New User', icon: mdiAccountPlus }],
  ['stores', { label: 'New Store', icon: mdiStorePlus }],
]);

const navLinks = [
  { label: 'Superusers', path: 'superusers', icon: mdiShieldAccount },
  { label: 'Users', path: 'users', icon: mdiAccount },
  { label: 'Stores', path: 'stores', icon: mdiStore },
  { label: 'Products', path: 'products', icon: mdiTag },
  { label: 'Items', path: 'items', icon: mdiBarcode },
];

export const Admin: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { closeModal, openModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const location = useLocation();
  const navigate = useNavigate();

  const segments = location.pathname.split('/').filter(Boolean);
  const thisSegment = segments[segments.length - 1];

  useEffect(() => {
    if (user && user.domain !== 'admin') {
      navigate('/404');
    }
  }, [user]);

  const openNewForm = () => {
    switch (thisSegment) {
      case 'superusers':
        return openModal(<SuperuserAdminForm />);
      case 'users':
        return openModal(<UserAdminForm />);
      case 'stores':
        return openModal(<StoreAdminForm />);
      default:
        return null;
    }
  };

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
              setToast({
                message: 'You have signed out successfully',
                type: 'success',
              });
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
      <header className="bg-slate-600 !text-white border-b flex items-center p-4 justify-between">
        <H5>Administrator</H5>
        <div className="flex gap-4">
          {addableSegments.includes(thisSegment) && (
            <Button onClick={openNewForm}>
              <Icon
                path={buttonLabel.get(thisSegment)?.icon || mdiCloudQuestion}
                size={1}
              />
              <p className="text-sm">{buttonLabel.get(thisSegment)?.label}</p>
            </Button>
          )}
          <Button onClick={signOut} title="Sign Out">
            <Icon path={mdiLogout} size={1} />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 justify-stretch h-full">
        {navLinks.length > 0 && (
          <nav
            className={`flex flex-col gap-2 justify-between bg-white border-r w-16 transition-all`}
          >
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map(({ label, path, icon }, index) => (
                <Link
                  key={index}
                  to={path}
                  className={`flex items-center gap-4 p-4 justify-center hover:bg-slate-200 text-slate-600`}
                  title={`Go to ${label}`}
                >
                  <Icon path={icon} size={1} />
                </Link>
              ))}
            </div>
          </nav>
        )}
        <main className="flex flex-col p-4 pb-[50vh] gap-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
