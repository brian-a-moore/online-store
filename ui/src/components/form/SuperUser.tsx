import { zodResolver } from '@hookform/resolvers/zod';
import { mdiDelete, mdiFormTextboxPassword } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetSuperuserAdminBody,
  GetSuperuserAdminQuery,
  GetSuperuserAdminResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import {
  EDIT_SELF_INITIAL_VALUES,
  EDIT_SUPERUSER_FORM_INITIAL_VALUES,
  EditSelfForm,
  EditSelfFormSchema,
  EditSuperuserForm,
  EditSuperuserFormSchema,
} from '../../forms/superuser';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';
import { TextInput } from '../input';
import { Button } from '../interactive';
import { H3 } from '../typography';

type Props = {
  superuserId?: string;
};

export const SuperuserForm: React.FC<Props> = ({ superuserId }) => {
  const { user } = useContext(AuthContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

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
    defaultValues: isSelf ? EDIT_SELF_INITIAL_VALUES : EDIT_SUPERUSER_FORM_INITIAL_VALUES,
    resolver: zodResolver(isSelf ? EditSelfFormSchema : EditSuperuserFormSchema),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if(response?.superuser) {
      setValue('name', response.superuser.name);
      setValue('email', response.superuser.email);
    }
  }, [response]);

  const onSubmit = async (data: any) => {};

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
      <TextInput<EditSelfForm | EditSuperuserForm>
        name="name"
        label="Name"
        control={control}
        invalidText={errors?.name?.message}
      />
      <TextInput<EditSelfForm | EditSuperuserForm>
        name="email"
        label="Email"
        control={control}
        invalidText={errors?.email?.message}
      />
      {isSelf ? (
        <>
          <TextInput<EditSelfForm>
            type="password"
            name="password"
            label="Password"
            control={control as unknown as Control<EditSelfForm>}
            invalidText={(errors as FieldErrors)?.password?.message}
          />
          <TextInput<EditSelfForm>
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            control={control as unknown as Control<EditSelfForm>}
            invalidText={(errors as FieldErrors)?.confirmPassword?.message}
          />
        </>
      ) : null}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={closeModal}>
          {isSubmitting ? (superuserId ? 'Updating...' : 'Creating...') : superuserId ? 'Update' : 'Create'} Superuser
        </Button>
      </div>
    </form>
  );
};
