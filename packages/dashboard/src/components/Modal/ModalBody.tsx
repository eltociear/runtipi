import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<IProps> = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

export default ModalBody;
