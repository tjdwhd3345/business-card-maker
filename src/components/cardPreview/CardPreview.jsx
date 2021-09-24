import React from 'react';
import CardViewList from '../cardViewList/CardViewList';
import styles from './CardPreview.module.css';

const CardPreview = ({ cards }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>Card Preview</h2>
        <ul className={styles.list}>
          {cards.map((card) => (
            <CardViewList key={card.key} info={card} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPreview;
