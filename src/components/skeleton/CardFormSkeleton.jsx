import React from 'react';
import styles from './CardFormSkeleton.module.css';

const CardFormSkeleton = () => (
  <div className={styles.wrap}>
    <div className={styles.title}>
      <h2>Card Maker</h2>
    </div>
    <ul className={styles.list}>
      {[0, 1, 2].map((v) => (
        <li className={styles.formWrap} key={v}>
          <div className={styles.formBlock}>
            <p className={styles.name} name='name'></p>
            <p className={styles.company} name='company'></p>
            <p className={styles.theme} name='theme'></p>
          </div>
          <div className={styles.formBlock}>
            <p className={styles.position} name='position'></p>
            <p className={styles.email} name='email'></p>
          </div>
          <div className={`${styles.formBlock} ${styles.msgBox}`}>
            <p className={styles.message} name='message'></p>
          </div>
          <div className={styles.formBlock}>
            <button className={styles.btnName}></button>
            <button className={styles.btnDelete}></button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CardFormSkeleton;
