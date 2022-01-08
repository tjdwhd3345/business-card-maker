import React, { memo } from 'react';
import styles from './CardViewList.module.css';
import userImage from '../../user.png';

const CardViewList = memo(({ info }) => {
  return (
    <li className={styles.listWrap} key={info.key}>
      <div className={`${styles.card} ${styles[info.theme]}`}>
        <div className={styles.image}>
          <img src={info.imageUrl || userImage} alt='사용자 이미지' />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{info.name}</p>
          <p className={styles.company}>{info.company}</p>
          <p className={styles.position}>{info.position}</p>
          <p className={styles.email}>{info.email}</p>
          <p className={styles.message}>"{info.message}"</p>
        </div>
      </div>
    </li>
  );
});

export default CardViewList;
