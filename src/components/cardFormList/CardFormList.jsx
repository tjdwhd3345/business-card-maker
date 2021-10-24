import React, { memo } from 'react';
import styles from './CardFormList.module.css';

const CardFormList = memo(({ info, handleChange }) => {
  /**
   * 키 이벤트와 현재 카드 키값을 상위로 전달.
   * @param {e} e : 키보드 이벤트
   */
  const handleInputChange = (e) => {
    handleChange(e, info.key);
  };
  console.log('cardFormlist', info.key);
  return (
    <li>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={info.name}
          name='name'
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Company'
          value={info.company}
          name='company'
          onChange={handleInputChange}
        />
        <select name='theme'>
          <option value='Light' defaultValue>
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
          value={info.position}
          name='position'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          value={info.email}
          name='email'
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          name='message'
          rows='2'
          placeholder='Message'
          value={info.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <button>me</button>
        <button>Delete</button>
      </div>
    </li>
  );
});

export default CardFormList;
