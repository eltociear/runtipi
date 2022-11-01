import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { useLoginMutation } from '../../../generated/graphql';
import { useToastStore } from '../../../state/toastStore';
import AuthFormLayout from '../components/AuthFormLayout';
import LoginForm from '../components/LoginForm';

type FormValues = { email: string; password: string };

const Login: React.FC = () => {
  const client = useApolloClient();
  const [login] = useLoginMutation({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const handleError = (error: unknown) => {
    localStorage.removeItem('token');
    if (error instanceof Error) {
      addToast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleLogin = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data } = await login({ variables: { input: { username: values.email, password: values.password } } });

      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
      }

      await client.refetchQueries({ include: ['Me'] });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormLayout>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </AuthFormLayout>
  );
};

export default Login;
