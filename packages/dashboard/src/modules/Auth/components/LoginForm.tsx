import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../components/Form/FormInputV2';
import Button from '../../../components/Form/Button';

type FormValues = { email: string; password: string };

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

interface IProps {
  onSubmit: (values: FormValues) => void;
  loading: boolean;
}

const LoginForm: React.FC<IProps> = ({ loading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h2 text-center mb-1">Login to your account</h2>
      <FormInput {...register('email')} label="Email address" error={errors.email?.message} disabled={loading} type="email" className="mt-3" placeholder="you@example.com" />
      <FormInput {...register('password')} label="Password" error={errors.password?.message} disabled={loading} type="password" placeholder="Your password" />
      <Button loading={loading} type="submit" className="btn btn-primary w-100">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
