import React, { useRef, useState } from 'react';
import styles from './CardFormList.module.css';

const CardFormList = ({ info, handleChange, handleRemove }) => {
  const [themeOptions, setThemeOptions] = useState([
    { value: 'Light', name: 'LightTheme' },
    { value: 'Dark', name: 'DarkTheme' },
    { value: 'Colorful', name: 'ColorfulTheme' },
  ]);
  const imageRef = useRef();
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

  const onBtnClick = (event) => {
    event.preventDefault();
    imageRef.current.click();
  };

  const onImageFileChange = async () => {
    const file = imageRef.current.files[0];
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudApiKey = process.env.CLOUDINARY_API_KEY;
    const imageUploadURL = `https://api.cloudinary.com/v1_1/drpteyub6/image/upload`;
    console.log('onFileChange', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dclwja8y');
    const res = await fetch(imageUploadURL, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    console.log('fetch result', result);
    handleChange({ target: { name: 'imageUrl', value: result.url } }, info.key);
    /* .then((response) => response.json())
      .then((result) => {
        console.log('fetch result', result);
      }); */
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
        <input
          type='file'
          name='profileImage'
          ref={imageRef}
          accept='image/*'
          onChange={onImageFileChange}
        ></input>
        <button className={styles.btnName} onClick={onBtnClick}>
          {info.name || 'No Profile Image'}
        </button>
        <button className={styles.btnDelete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default CardFormList;
