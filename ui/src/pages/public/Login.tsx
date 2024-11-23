import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { authLoginSchema } from '../../../../api/src/schemas/auth';
import { AuthLoginBody } from '../../../../api/src/types/api';
import { api } from '../../api';
import { Card } from '../../components/container';
import { ErrorText, TextInput } from '../../components/form';
import { Button, Link } from '../../components/interactive';
import { H1 } from '../../components/typography';
import { AUTH_TOKEN } from '../../constants';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

const DEFAULT_VALUES: AuthLoginBody = {
  email: '',
  password: '',
};

export const Login: React.FC<Props> = () => {
  const { setUser } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(authLoginSchema.body),
  });

  const onSubmit = async (loginCredentials: AuthLoginBody) => {
    try {
      const { token, id } = await api.auth.authLogin(loginCredentials);
      setUser({ id });

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
          <H1>Login</H1>
          <hr />
          <TextInput name="email" label="Email" control={control} invalidText={errors?.email?.message} />
          <TextInput
            type="password"
            name="password"
            label="Password"
            control={control}
            invalidText={errors?.email?.message}
          />
          <Button disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Log In'}</Button>
          {formError ? <ErrorText>{formError}</ErrorText> : null}
        </form>
        <p>
          Not here to manage a store? <Link href="/">View Stores</Link>
        </p>
      </Card>
    </div>
  );
};
