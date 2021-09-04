import React from 'react';
import CardFormList from '../cardFormList/CardFormList';
import styles from './CardMaker.module.css';

const CardMaker = ({ cards }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>Card Maker</h2>
      </div>
      <ul className={styles.list}>
        {cards.map((card) => {
          return (
            <>
              <li>
                <CardFormList info={card} />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default CardMaker;
