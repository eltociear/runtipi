import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { useRegisterMutation } from '../../../generated/graphql';
import { useToastStore } from '../../../state/toastStore';
import AuthFormLayout from '../components/AuthFormLayout';
import RegisterForm from '../components/RegisterForm';

const Onboarding: React.FC = () => {
  const client = useApolloClient();
  const { addToast } = useToastStore();
  const [register] = useRegisterMutation({ refetchQueries: ['Me'] });
  const [loading, setLoading] = useState(false);

  const handleError = (error: unknown) => {
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

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data } = await register({ variables: { input: { username: values.email, password: values.password } } });

      if (data?.register?.token) {
        localStorage.setItem('token', data.register.token);
      }

      await client.refetchQueries({ include: ['Me'] });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormLayout title="Welcome to your Tipi" description="Register your account to get started">
      <RegisterForm onSubmit={handleRegister} loading={loading} />
    </AuthFormLayout>
  );
};

export default Onboarding;
