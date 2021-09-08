import React from 'react';
import styles from './CardFormList.module.css';

const CardFormList = ({ info,handleChange }) => {
  const { name, company, theme, position, email, message } = info;
  
  console.log('info', info);

  return (
    <div className={`${styles.content}`}>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Company'
          value={company}
          name='company'
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
          value={position}
          name='position'
        />
        <input type='email' placeholder='Email' value={email} name='email' />
      </div>
      <div>
        <textarea
          name='message'
          rows='2'
          placeholder='Message'
          value={message}
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
