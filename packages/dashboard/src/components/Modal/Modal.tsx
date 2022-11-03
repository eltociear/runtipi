import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Modal.module.scss';

interface IProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: React.FC<IProps> = ({ children, isOpen, onClose }) => {
  const style = { display: 'none' };

  if (isOpen) {
    style.display = 'block';
  }

  const [modal, setModal] = useState<HTMLDivElement | null>(null);

  // On click outside
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    },
    [modal, onClose],
  );

  // On click outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [handleClickOutside]);

  return (
    <div className={clsx('modal modal-blur', styles.main)} tabIndex={-1} style={style}>
      <div ref={setModal} className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="shadow modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
