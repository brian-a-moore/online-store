import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetUserAdminBody,
  GetUserAdminQuery,
  GetUserAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  userId?: string;
};

export const UserForm: React.FC<Props> = ({ userId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetUserAdminBody,
    GetUserAdminQuery,
    GetUserAdminResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/user/${userId}`,
    },
    { isAutoTriggered: !!userId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openDeleteUserDialog = (id: string) => {
    openModal(
      <>
        <H3>Delete User</H3>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeModal}>
            Delete User
          </Button>
        </div>
      </>,
    );
  };

  const openResetPasswordDialog = (id: string) => {
    openModal(
      <>
        <H3>Reset Password</H3>
        <p>Are you sure you want to reset this user's password?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={closeModal}>Reset Password</Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between">
        <H3>{userId ? 'Edit' : 'New'} User</H3>
        {userId ? (
          <div className="flex gap-4">
            <Button variant="secondary" title="Delete User" onClick={() => openDeleteUserDialog(userId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
            <Button variant="secondary" title="Reset Password" onClick={() => openResetPasswordDialog(userId)}>
              <Icon path={mdiFormTextboxPassword} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <p>{JSON.stringify(response?.user)}</p>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>{userId ? 'Update' : 'Create'} User</Button>
      </div>
    </form>
  );
};
