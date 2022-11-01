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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, IProps>(({ onChange, onBlur, name, label, placeholder, error, type = 'text', className }, ref) => {
  return (
    <div className={clsx('mb-3', className)}>
      {label && <label className="form-label">{label}</label>}
      <input name={name} onBlur={onBlur} onChange={onChange} type={type} ref={ref} className={clsx('form-control', { 'is-invalid is-invalid-lite': error })} placeholder={placeholder} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
});

export default FormInput;
