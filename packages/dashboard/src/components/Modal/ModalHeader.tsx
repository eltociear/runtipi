import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<IProps> = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

export default ModalHeader;
