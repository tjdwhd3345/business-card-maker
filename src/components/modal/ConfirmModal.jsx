import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ message, callback }) => {
  const handleButtonClick = (e) => {
    callback(e.target.name);
  };
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.msgBox}>{message}</div>
          <div className={styles.btnBox}>
            <button onClick={handleButtonClick} name='ok'>
              OK
            </button>
            <button onClick={handleButtonClick} name='cancel'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
