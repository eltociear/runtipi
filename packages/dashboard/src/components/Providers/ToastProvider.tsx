import React from 'react';
import clsx from 'clsx';
import { useToastStore, Toast } from '../../state/toastStore';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, removeToast } = useToastStore();

  const renderToast = (toast: Toast) => {
    const { status, title } = toast;

    return (
      <div
        className={clsx('show fade alert alert-important alert-dismissible transition-all', {
          'alert-danger': status === 'error',
          'alert-success': status === 'success',
          'alert-info': status === 'info',
          warning: status === 'warning',
        })}
        role="alert"
      >
        <div className="d-flex align-items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon alert-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="flex-fill">
            <h4 className="alert-title text-white font-weight-bold">{title}</h4>
            {toast.description && <div className="text-white">{toast.description}</div>}
          </div>
        </div>
        <a onClick={() => removeToast(toast.id)} className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="close"></a>
      </div>
    );
  };

  return (
    <>
      {toasts.map((toast) => (
        <div key={toast.id} className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          {renderToast(toast)}
        </div>
      ))}
      {children}
    </>
  );
};

export default ToastProvider;
