import React from 'react';
import styles from './CardFormList.module.css';

const CardFormList = ({ info }) => {
  const { name, company, theme, position, email, message } = info;
  return (
    <div className={`${styles.content}`}>
      <div>
        <input type='text' id='name' placeholder='Name' value={name} />
        <input type='text' id='company' placeholder='Company' value={company} />
        <select name='theme' id='theme'>
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
          id='position'
          placeholder='Position'
          value={position}
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={email}
        />
      </div>
      <div>
        <textarea
          name='message'
          id='message'
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