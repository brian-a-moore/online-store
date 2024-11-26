import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetSuperuserAdminBody,
  GetSuperuserAdminQuery,
  GetSuperuserAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  superuserId?: string;
};

export const SuperuserForm: React.FC<Props> = ({ superuserId }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetSuperuserAdminBody,
    GetSuperuserAdminQuery,
    GetSuperuserAdminResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/superuser/${superuserId}`,
    },
    { isAutoTriggered: !!superuserId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openDeleteSuperuserDialog = (id: string) => {
    openModal(
      <>
        <H3>Delete Superuser</H3>
        <p>Are you sure you want to delete this superuser?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={closeModal}>
            Delete Superuser
          </Button>
        </div>
      </>,
    );
  };

  const openResetPasswordDialog = (id: string) => {
    openModal(
      <>
        <H3>Reset Password</H3>
        <p>Are you sure you want to reset this superuser's password?</p>
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
        <H3>{superuserId ? 'Edit' : 'New'} Superuser</H3>
        {superuserId ? (
          <div className="flex gap-4">
            <Button variant="secondary" title="Delete Superuser" onClick={() => openDeleteSuperuserDialog(superuserId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
            <Button variant="secondary" title="Reset Password" onClick={() => openResetPasswordDialog(superuserId)}>
              <Icon path={mdiFormTextboxPassword} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <p>{JSON.stringify(response?.superuser)}</p>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>{superuserId ? 'Update' : 'Create'} Superuser</Button>
      </div>
    </form>
  );
};
