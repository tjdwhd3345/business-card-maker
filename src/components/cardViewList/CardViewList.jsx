import React from 'react';
import styles from './CardViewList.module.css';

const CardViewList = ({ info }) => {
  return (
    <li className={styles.listWrap}>
      <div className={styles.card}>
        <div className={styles.image}>here is image.</div>
        <div className={styles.content}>
          <span className={styles.name}>{info.name}</span>
          <span className={styles.company}>{info.company}</span>
          <span className={styles.position}>{info.position}</span>
          <span className={styles.email}>{info.email}</span>
          <span className={styles.message}>"{info.message}"</span>
        </div>
      </div>
    </li>
  );
};

export default CardViewList;
