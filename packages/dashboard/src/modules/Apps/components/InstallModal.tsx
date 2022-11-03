import React from 'react';
import InstallForm from './InstallForm';
import { AppInfo } from '../../../generated/graphql';
import Modal from '../../../components/Modal';
import ModalHeader from '../../../components/Modal/ModalHeader';
import ModalBody from '../../../components/Modal/ModalBody';

interface IProps {
  app: AppInfo;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
}

const InstallModal: React.FC<IProps> = ({ app, isOpen, onClose, onSubmit }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader>
        <h5 className="modal-title">Install {app.name}</h5>
      </ModalHeader>
      <ModalBody>
        <InstallForm onSubmit={onSubmit} formFields={app.form_fields} exposable={app.exposable} />
      </ModalBody>
    </Modal>
  );

  // return (
  //   <Modal isOpen={isOpen} onClose={onClose}>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Install {app.name}</ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody>
  //         <InstallForm onSubmit={onSubmit} formFields={app.form_fields} exposable={app.exposable} />
  //       </ModalBody>
  //     </ModalContent>
  //   </Modal>
  // );
};

export default InstallModal;
