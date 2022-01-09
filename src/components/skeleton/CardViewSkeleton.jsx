import React from 'react';
import styles from './CardViewSkeleton.module.css';

const CardViewSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Card View</h2>
      </div>
      <ul className={styles.listContainer}>
        {[0, 1, 2].map((v) => (
          <li className={styles.listWrap} key={v}>
            <div className={styles.image}>
              <div />
            </div>
            <div className={styles.content}>
              <p className={styles.name}></p>
              <p className={styles.company}></p>
              <p className={styles.position}></p>
              <p className={styles.email}></p>
              <p className={styles.message}></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardViewSkeleton;
