import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GetUserAdminBody, GetUserAdminQuery, GetUserAdminResponse } from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { DEFAULT_FORM_VALUES, userAdminFormSchema, UserAdminFormType } from '../../../config/forms/user-admin-form';
import { HTTP_METHOD } from '../../../constants';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { Alert } from '../../container';
import { TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  userId?: string;
  forceReload: () => void;
};

export const UserAdminForm: React.FC<Props> = ({ userId, forceReload }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetUserAdminBody, GetUserAdminQuery, GetUserAdminResponse>(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/user/${userId}`,
    },
    { isAutoTriggered: !!userId },
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(userAdminFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.user) {
      setValue('name', response.user.name);
      setValue('email', response.user.email);
    }
  }, [response]);

  const onSubmit = async (user: UserAdminFormType) => {
    try {
      let response;
      if (userId) {
        response = await api.admin.updateUser(userId, user);
      } else {
        response = await api.admin.createUser(user);
      }
      if (!userId) openShowDefaultPassword(response.defaultPassword, true);
      else {
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'User updated successfully' });
      }
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  const openShowDefaultPassword = (password: string, isNew: boolean) => {
    openModal(
      <>
        <H3>Default Password</H3>
        <p>{!isNew ? "The user's password has been reset. " : ''}Share this temporary password with the user:</p>
        <p className="bg-sky-200 text-sky-800 font-semibold p-4 rounded text-center">{password}</p>
        <Alert type="warn">This password will not be visable once this dialog is closed.</Alert>
        <Alert type="warn">Users should immediately change their password upon {isNew ? 'first' : 'next'} login.</Alert>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              forceReload();
              closeModal();
            }}
          >
            Close
          </Button>
        </div>
      </>,
    );
  };

  const openDeleteUserDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.admin.deleteUser(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'User deleted successfully' });
      } catch (error: any | unknown) {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    };
    openModal(
      <>
        <H3>Delete User</H3>
        <p>Are you sure you want to delete this user?</p>
        {formError ? <ErrorText>{formError}</ErrorText> : null}
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete User
          </Button>
        </div>
      </>,
    );
  };

  const openResetPasswordDialog = (id: string) => {
    const onClick = async () => {
      try {
        const response = await api.admin.resetUserPassword(id);
        if (response.newPassword) openShowDefaultPassword(response.newPassword, false);
      } catch (error: any | unknown) {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    };
    openModal(
      <>
        <H3>Reset Password</H3>
        <p>Are you sure you want to reset this user's password?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={onClick}>Reset Password</Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{userId ? 'Edit' : 'New'} User</H3>
        {userId ? (
          <div className="flex gap-4">
            <Button variant="tertiary" title="Delete User" onClick={() => openDeleteUserDialog(userId)}>
              <Icon path={mdiDelete} size={0.75} />
            </Button>
            <Button variant="tertiary" title="Reset Password" onClick={() => openResetPasswordDialog(userId)}>
              <Icon path={mdiFormTextboxPassword} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <TextInput name="name" label="Name" control={control} invalidText={errors?.name?.message} />
      <TextInput name="email" label="Email" control={control} invalidText={errors?.email?.message} />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (userId ? 'Updating' : 'Creating') : userId ? 'Update' : 'Create'} User
        </Button>
      </div>
    </form>
  );
};
