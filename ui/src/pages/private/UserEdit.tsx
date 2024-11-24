import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    CreateUserBody,
    GetUserBody,
    GetUserQuery,
    GetUserResponse,
    UpdateUserBody,
} from '../../../../api/src/types/api';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createUserSchema } from '../../../../api/src/schemas/user';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { ErrorText, TextInput } from '../../components/input';
import { Button } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

const DEFAULT_VALUES: CreateUserBody = {
  name: '',
  email: '',
  isSuperUser: false,
  stores: [],
};

export const UserEdit: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);
  const [formError, setFormError] = useState<string | null>(null);

  const { error, isLoading, response } = useApi<GetUserBody, GetUserQuery, GetUserResponse>(
    {
      url: `/admin/user/${userId}`,
      method: HTTP_METHOD.GET,
    },
    { isAutoTriggered: !!userId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(createUserSchema.body),
  });

  useEffect(() => {
    const user = response?.user;
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('isSuperUser', user.isSuperUser);
      setValue('stores', user.stores);
    }
  }, [JSON.stringify(response), setValue]);

  const onSubmit: any = async (data: CreateUserBody | UpdateUserBody) => {};

  const getComfirmButtonText = () => {
    if (isSubmitting && userId) return 'Updating User...';
    else if (isSubmitting && !userId) return 'Creating User...';
    else if (!isSubmitting && userId) return 'Update User';
    else return 'Create User';
  };

  if (isLoading) return <Loader />;

  const user = response?.user;

  return (
    <Page>
      <Container>
        <Card>
          <div className="flex justify-between">
            <H2>{user?.name || 'New User'}</H2>
            {user && (
              <Button
                variant="destructive"
                title="Delete User"
                onClick={() =>
                  setModal({
                    title: 'Delete User',
                    Body: (
                      <p>
                        Deleting a user will remove the person's access to this account. It will not delete any other
                        data. This is immediate and unrecoverable. Are you sure you want to delete this user?
                      </p>
                    ),
                    ActionBar: [
                      <Button variant="secondary" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button variant="destructive" onClick={() => {}}>
                        Delete User
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
            )}
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TextInput name="name" control={control} label="Name" invalidText={errors.name?.message} />

            <TextInput name="email" control={control} label="Email" invalidText={errors.email?.message} />
            {formError && <ErrorText>{formError}</ErrorText>}
            <hr />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {getComfirmButtonText()}
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </Page>
  );
};
