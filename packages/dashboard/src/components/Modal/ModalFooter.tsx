import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const ModalFooter: React.FC<IProps> = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

export default ModalFooter;
