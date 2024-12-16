import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  DEFAULT_FORM_VALUES_SELF,
  superuserAdminFormSchema,
  SuperuserAdminFormType,
  superuserSelfAdminFormSchema,
  SuperuserSelfAdminFormType,
} from '../../../config/forms/superuser-admin-form';
import { AuthContext } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Alert } from '../../container';
import { TextInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  superuserId?: string;
};

export const SuperuserAdminForm: React.FC<Props> = ({ superuserId }) => {
  const { user } = useContext(AuthContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const isSelf = user?.id === superuserId;

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-superuser-admin', superuserId],
    queryFn: () => api.superuser.getSuperuserAdmin(superuserId),
    enabled: !!superuserId,
  });

  const createSuperuserMutation = useMutation({
    mutationFn: api.superuser.createSuperuserAdmin,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: (response) => {
      setToast({
        type: 'success',
        message: 'Superuser created successfully',
      });
      openShowDefaultPassword(response.defaultPassword, true);
      queryClient.refetchQueries({ queryKey: ['list-superusers-admin'] });
    },
  });

  const updateSuperuserMutation = useMutation({
    mutationFn: api.superuser.updateSuperuserAdmin,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Superuser created successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-superusers-admin'] });
      closeModal();
    },
  });

  const deleteSuperuserMutation = useMutation({
    mutationFn: api.superuser.deleteSuperuserAdmin,
    onError: (error) => {
      setFormError(error?.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Superuser deleted successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-superusers-admin'] });
      closeModal();
    },
  });

  const resetSuperuserPasswordMutation = useMutation({
    mutationFn: api.superuser.resetSuperuserPasswordAdmin,
    onError: (error) => {
      setFormError(error?.message || 'An unknown error occurred');
    },
    onSuccess: (response) => {
      setToast({
        type: 'success',
        message: 'Superuser deleted successfully',
      });
      openShowDefaultPassword(response.newPassword, false);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isSelf ? DEFAULT_FORM_VALUES_SELF : DEFAULT_FORM_VALUES,
    resolver: zodResolver(
      isSelf ? superuserSelfAdminFormSchema : superuserAdminFormSchema,
    ),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (data?.superuser) {
      setValue('name', data.superuser.name);
      setValue('email', data.superuser.email);
    }
  }, [data]);

  const openShowDefaultPassword = (password: string, isNew: boolean) => {
    openModal(
      <>
        <H3>Default Password</H3>
        <p>
          {!isNew ? "The user's password has been reset. " : ''}Share this
          temporary password with the user:
        </p>
        <p className="bg-sky-200 text-sky-800 font-semibold p-4 rounded text-center">
          {password}
        </p>
        <Alert type="warn">
          This password will not be visable once this dialog is closed.
        </Alert>
        <Alert type="warn">
          Users should immediately change their password upon{' '}
          {isNew ? 'first' : 'next'} login.
        </Alert>
        <div className="flex justify-center">
          <Button
            onClick={() => {
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
    const onClick = async () => deleteSuperuserMutation.mutate(id);
    openModal(
      <>
        <H3>Delete Superuser</H3>
        <p>Are you sure you want to delete this superuser?</p>
        {formError ? <ErrorText>{formError}</ErrorText> : null}
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
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
    const onClick = () => resetSuperuserPasswordMutation.mutate(id);
    openModal(
      <>
        <H3>Reset Password</H3>
        <p>Are you sure you want to reset this superuser's password?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={onClick}>Reset Password</Button>
        </div>
      </>,
    );
  };

  const onSubmit = async (
    superUser: SuperuserAdminFormType | SuperuserSelfAdminFormType,
  ) => {
    if (superuserId) {
      let superuserUpdate = Object.entries(superUser).reduce(
        (acc, [key, value]) => {
          if (key !== 'confirmPassword') (acc as any)[key] = value;
          return acc;
        },
        {} as Partial<SuperuserAdminFormType | SuperuserSelfAdminFormType>,
      );
      return updateSuperuserMutation.mutate({
        superuserId,
        superuserUpdate,
      });
    } else {
      return createSuperuserMutation.mutate(superUser);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{superuserId ? 'Edit' : 'New'} Superuser</H3>
        {superuserId && !isSelf ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Delete Superuser"
              onClick={() => openDeleteSuperuserDialog(superuserId)}
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
            <Button
              variant="tertiary"
              title="Reset Password"
              onClick={() => openResetPasswordDialog(superuserId)}
            >
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
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? superuserId
              ? 'Updating'
              : 'Creating'
            : superuserId
              ? 'Update'
              : 'Create'}{' '}
          Superuser
        </Button>
      </div>
    </form>
  );
};
