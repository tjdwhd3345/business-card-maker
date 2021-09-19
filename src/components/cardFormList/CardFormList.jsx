import React, { useState } from 'react';
import styles from './CardFormList.module.css';

const CardFormList = ({ info, handleChange }) => {
  const [cardInfo, setCardInfo] = useState(info);

  console.log('info', cardInfo);

  /**
   * 키 이벤트와 현재 카드 키값을 상위로 전달.
   * @param {e} e : 키보드 이벤트
   */
  const handleInputChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
    handleChange(e, cardInfo.key);
  };

  return (
    <div className={`${styles.content}`}>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={cardInfo.name}
          name='name'
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Company'
          value={cardInfo.company}
          name='company'
          onChange={handleInputChange}
        />
        <select name='theme'>
          <option value='Light' selected>
            Light
          </option>
          <option value='Dark'>Dark</option>
          <option value='Colorful'>Colorful</option>
        </select>
      </div>
      <div>
        <input
          type='text'
          placeholder='Position'
          value={cardInfo.position}
          name='position'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          value={cardInfo.email}
          name='email'
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          name='message'
          rows='2'
          placeholder='Message'
          value={cardInfo.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <button>me</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default CardFormList;
