import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetUserAdminBody,
  GetUserAdminQuery,
  GetUserAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import { EDIT_USER_FORM_INITIAL_VALUES, EditUserFormSchema } from '../../forms/user';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { TextInput } from '../input';
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EDIT_USER_FORM_INITIAL_VALUES,
    resolver: zodResolver(EditUserFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if(response?.user) {
      setValue('name', response.user.name);
      setValue('email', response.user.email);
    }
  }, [response]);

  const onSubmit = async (data: any) => {};

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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
      <TextInput
        name="name"
        label="Name"
        control={control}
        invalidText={errors?.name?.message}
      />
      <TextInput
        name="email"
        label="Email"
        control={control}
        invalidText={errors?.email?.message}
      />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>{userId ? 'Update' : 'Create'} User</Button>
      </div>
    </form>
  );
};
