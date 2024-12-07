import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetSuperuserAdminBody,
  GetSuperuserAdminQuery,
  GetSuperuserAdminResponse,
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { DEFAULT_FORM_VALUES, DEFAULT_FORM_VALUES_SELF, superuserAdminFormSchema, SuperuserAdminFormType, superuserSelfAdminFormSchema, SuperuserSelfAdminFormType } from '../../../config/forms/superuser-admin-form';
import { HTTP_METHOD } from '../../../constants';
import { AuthContext } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import useApi from '../../../hooks/useApi';
import { Alert } from '../../container';
import { Loader } from '../../core';
import { TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  superuserId?: string;
  forceReload: () => void;
};

export const SuperuserAdminForm: React.FC<Props> = ({ superuserId, forceReload }) => {
  const { user } = useContext(AuthContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const isSelf = user?.id === superuserId;

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isSelf ? DEFAULT_FORM_VALUES_SELF : DEFAULT_FORM_VALUES,
    resolver: zodResolver(isSelf ? superuserSelfAdminFormSchema : superuserAdminFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.superuser) {
      setValue('name', response.superuser.name);
      setValue('email', response.superuser.email);
    }
  }, [response]);

  const onSubmit = async (superUser: SuperuserAdminFormType | SuperuserSelfAdminFormType) => {
    try {
      let sanitizedSuperUser, response;
      if (superuserId) {
        sanitizedSuperUser = Object.entries(superUser).reduce(
          (acc, [key, value]) => {
            if (key !== 'confirmPassword') (acc as any)[key] = value;
            return acc;
          },
          {} as Partial<SuperuserAdminFormType | SuperuserSelfAdminFormType>,
        );
        response = await api.admin.updateSuperuser(superuserId, sanitizedSuperUser);
      } else {
        response = await api.admin.createSuperuser(superUser);
      }
      if (!superuserId) openShowDefaultPassword(response.defaultPassword, true);
      else {
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Superuser updated successfully' });
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

  const openDeleteSuperuserDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.admin.deleteSuperuser(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'Superuser deleted successfully' });
      } catch (error: any | unknown) {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    };
    openModal(
      <>
        <H3>Delete Superuser</H3>
        <p>Are you sure you want to delete this superuser?</p>
        {formError ? <ErrorText>{formError}</ErrorText> : null}
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Delete Superuser
          </Button>
        </div>
      </>,
    );
  };

  const openResetPasswordDialog = (id: string) => {
    const onClick = async () => {
      try {
        const response = await api.admin.resetSuperuserPassword(id);
        if (response.newPassword) openShowDefaultPassword(response.newPassword, false);
      } catch (error: any | unknown) {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    };
    openModal(
      <>
        <H3>Reset Password</H3>
        <p>Are you sure you want to reset this superuser's password?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={onClick}>Reset Password</Button>
        </div>
      </>,
    );
  };

  if (isLoading) return <Loader />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{superuserId ? 'Edit' : 'New'} Superuser</H3>
        {superuserId && !isSelf ? (
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
      {isSelf ? (
        <>
          <TextInput<SuperuserSelfAdminFormType>
            type="password"
            name="password"
            label="Password"
            control={control as unknown as Control<SuperuserSelfAdminFormType>}
            invalidText={(errors as FieldErrors)?.password?.message}
          />
          <TextInput<SuperuserSelfAdminFormType>
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            control={control as unknown as Control<SuperuserSelfAdminFormType>}
            invalidText={(errors as FieldErrors)?.confirmPassword?.message}
          />
        </>
      ) : null}
      {formError ? <ErrorText>{formError}</ErrorText> : null}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (superuserId ? 'Updating' : 'Creating') : superuserId ? 'Update' : 'Create'} Superuser
        </Button>
      </div>
    </form>
  );
};
