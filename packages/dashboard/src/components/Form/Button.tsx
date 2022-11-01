import React from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, IProps>(({ type, className, children, loading, disabled }, ref) => {
  return (
    <button disabled={disabled || loading} ref={ref} className={clsx('btn btn-primary', className, { disabled: disabled || loading })} type={type}>
      {loading ? <span className="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true" /> : children}
    </button>
  );
});

export default Button;
