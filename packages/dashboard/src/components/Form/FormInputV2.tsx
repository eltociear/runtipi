import React from 'react';
// import { Input } from '@chakra-ui/react';
import clsx from 'clsx';

interface IProps {
  placeholder?: string;
  error?: string;
  label?: string;
  className?: string;
  isInvalid?: boolean;
  type?: HTMLInputElement['type'];
}

const FormInput = React.forwardRef<HTMLInputElement, IProps>(({ placeholder, error, type = 'text', label, className }, ref) => {
  return (
    <div className={clsx('mb-3', className)}>
      {label && <label className="form-label">{label}</label>}
      <input type={type} ref={ref} className={clsx('form-control', { 'is-invalid is-invalid-lite': error })} placeholder={placeholder} />
    </div>
  );
});

export default FormInput;
