import React, { useState } from 'react';
import styles from './CardFormList.module.css';

const CardFormList = ({ info, handleChange, handleRemove }) => {
  const [themeOptions, setThemeOptions] = useState([
    { value: 'Light', name: 'LightTheme' },
    { value: 'Dark', name: 'DarkTheme' },
    { value: 'Colorful', name: 'ColorfulTheme' },
  ]);
  /**
   * 키 이벤트와 현재 카드 키값을 상위로 전달.
   * @param {e} e : 키보드 이벤트
   */
  const handleInputChange = (e) => {
    handleChange(e, info.key);
  };

  const handleDelete = (e) => {
    console.log('delete', e, info.key);
    handleRemove(e, info.key);
  };
  console.log('cardFormlist', info.key);
  return (
    <li className={styles.formWrap}>
      <div className={styles.formBlock}>
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
        <select name='theme' onChange={handleInputChange}>
          {themeOptions.map((option) => (
            <option
              value={option.value}
              defaultValue={option.value === info.theme}
            >
              {option.value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formBlock}>
        <input
          type='text'
          placeholder='Position'
          value={info.position}
          name='position'
          onChange={handleInputChange}
        />
        <input
          type='email'
          placeholder='Email'
          value={info.email}
          name='email'
          onChange={handleInputChange}
        />
      </div>
      <div className={`${styles.formBlock} ${styles.msgBox}`}>
        <textarea
          name='message'
          rows='4'
          placeholder='Message'
          value={info.message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.formBlock}>
        <button>me</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default CardFormList;
