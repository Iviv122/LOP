import { apiClient } from '@/lib/providers/api';
import { useAuth } from '@/lib/providers/auth';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

type LoginFields = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { signIn } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const loginMutation = apiClient.useMutation('post', '/api/login_check');

  const onSubmit = useCallback(
    async (values: LoginFields) => {
      setFormError('');
      
      try {
        const response = await loginMutation.mutateAsync({ body: values });

        if (response?.token) {
          await signIn(response.token);
        } else {
          setFormError('Invalid response from server.');
        }
      } catch (error: any) {
        console.error('Login failed', error);

        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Invalid username or password.';

        setFormError(errorMessage);
      }
    },
    [loginMutation, signIn]
  );

  const isLoading = loginMutation.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <Controller
          control={control}
          name="username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              disabled={isLoading}
            />
          )}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          )}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      {formError && <p className="error">{formError}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}