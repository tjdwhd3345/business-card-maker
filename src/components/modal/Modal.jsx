import React from 'react';
import ReactDom from 'react-dom';
import ConfirmModal from './ConfirmModal';
import ProgressModal from './ProgressModal';

const Modal = ({ modalType, visible, message, callback }) => {
  const modalRoot = document.getElementById('modal-root');
  const modal =
    modalType === 'confirm' ? (
      <ConfirmModal message={message} callback={callback} />
    ) : (
      <ProgressModal message={message} />
    );
  return ReactDom.createPortal(visible ? modal : null, modalRoot);
};

export default Modal;
