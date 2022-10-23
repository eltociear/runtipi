import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
// import { Field, Form } from 'react-final-form';
import validator from 'validator';
import FormInput from '../../../components/Form/FormInputV2';

type FormValues = { email: string; password: string };

interface IProps {
  onSubmit: (values: FormValues) => void;
  loading: boolean;
}

const LoginForm: React.FC<IProps> = ({ loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const validateFields = (values: FormValues) => {
    if (!validator.isEmail(values.email || '')) {
      setError('email', { message: 'Invalid email' });
    }

    if (!values.password) {
      setError('password', { message: 'Password is required' });
    }
  };

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(validateFields)}>
      <fieldset className="form-fieldset">
        <FormInput {...register('email')} error={errors.email?.message} type="" className="mt-3" placeholder="Email" />
        <FormInput {...register('password')} error={errors.password?.message} placeholder="Password" type="password" />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
