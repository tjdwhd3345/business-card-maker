import React from 'react';
import CardFormList from '../cardFormList/CardFormList';
import styles from './CardMaker.module.css';

const CardMaker = ({ cards, handleChange }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>Card Maker</h2>
      </div>
      <ul className={styles.list}>
        {cards.map((card) => (
          <li>
            <CardFormList info={card} handleChange={handleChange} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardMaker;
