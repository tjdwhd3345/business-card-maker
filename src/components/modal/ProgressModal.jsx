import React from 'react';
import styles from './ProgressModal.module.css';

const ProgressModal = ({ message }) => {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.inner}>
          {message}
          <div className={styles.loading}></div>
        </div>
      </div>
    </>
  );
};

export default ProgressModal;
