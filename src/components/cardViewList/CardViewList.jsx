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
          <p className={styles.name}>{info.name || '이름'}</p>
          <p className={styles.company}>{info.company || '소속'}</p>
          <p className={styles.position}>{info.position || '직급'}</p>
          <p className={styles.email}>{info.email || '이메일'}</p>
          <p className={styles.message}>"{info.message || '코멘트'}"</p>
        </div>
      </div>
    </li>
  );
});

export default CardViewList;
