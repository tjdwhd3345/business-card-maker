import React from 'react';
import styles from './CardViewList.module.css';

const CardViewList = ({ info }) => {
  const { name, company, theme, position, email, message } = info;
  return (
    <div className={styles.card}>
      <div className={styles.image}>here is image.</div>
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.company}>{company}</span>
        <span className={styles.position}>{position}</span>
        <span className={styles.email}>{email}</span>
        <span className={styles.message}>"{message}"</span>
      </div>
    </div>
  );
};

export default CardViewList;
