import React from 'react';
import CardFormList from '../cardFormList/CardFormList';
import styles from './CardMaker.module.css';

const CardMaker = ({
  cards,
  handleChange,
  handleRemove,
  imageUploadService,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>Card Maker</h2>
      </div>
      <ul className={styles.list}>
        {cards.map((card) => (
          <CardFormList
            key={card.key}
            info={card}
            handleChange={handleChange}
            handleRemove={handleRemove}
            imageUploadService={imageUploadService}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardMaker;
