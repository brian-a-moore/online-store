import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginAuthSchema } from '../../../../api/src/schemas/auth';
import { LoginAuthBody } from '../../../../api/src/types/api';
import { api } from '../../api';
import { Card } from '../../components/container';
import { Separator } from '../../components/display';
import { ErrorText, TextInput } from '../../components/input';
import { Button, TextButton } from '../../components/interactive';
import { AUTH_TOKEN } from '../../constants';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

const DEFAULT_VALUES: LoginAuthBody = {
  email: '',
  password: '',
};

export const Login: React.FC<Props> = () => {
  const { setUser } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | null>(null);
  const [domain, setDomain] = useState<'admin' | 'user'>('user');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(loginAuthSchema.body),
  });

  const onSubmit = async (loginCredentials: LoginAuthBody) => {
    try {
      const { token, user } = await api.auth.authLogin(loginCredentials, domain);
      setUser(user);

      localStorage.setItem(AUTH_TOKEN, token);
    } catch (error: any | unknown) {
      if (error?.response?.status === 404) {
        setFormError('Account not found');
      } else {
        setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-[640px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <TextButton onClick={() => setDomain('user')} isActive={domain === 'user'}>
              Dashboard Login
            </TextButton>
            |
            <TextButton onClick={() => setDomain('admin')} isActive={domain === 'admin'}>
              Admin Login
            </TextButton>
          </div>
          <Separator />
          <TextInput name="email" label="Email" control={control} invalidText={errors?.email?.message} />
          <TextInput
            type="password"
            name="password"
            label="Password"
            control={control}
            invalidText={errors?.email?.message}
          />
          {formError ? <ErrorText>{formError}</ErrorText> : null}
          <Button disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Log In'}</Button>
        </form>
      </Card>
    </div>
  );
};
