import React, { useRef, useState } from 'react';
import Modal from '../modal/Modal';
import styles from './CardFormList.module.css';

const CardFormList = ({
  info,
  handleChange,
  handleRemove,
  imageUploadService,
}) => {
  const [themeOptions, setThemeOptions] = useState([
    { value: 'Light', name: 'LightTheme' },
    { value: 'Dark', name: 'DarkTheme' },
    { value: 'Colorful', name: 'ColorfulTheme' },
  ]);
  const [modalInfo, setModalInfo] = useState({
    modalType: 'confirm',
    modalVisible: false,
    message: '삭제하시겠습니까?',
  });
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

  /**
   * 버튼 클릭 시 input click 이벤트 실행
   * @param {event} event
   */
  const onBtnClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  const handleModalCallback = () => {};

  /**
   * 프로필 이미지 업로드 및 변경
   */
  const onImageFileChange = async () => {
    setModalInfo((modalInfo) => ({
      modalType: 'progress',
      modalVisible: true,
      message: '이미지 업로드 중',
    }));
    const file = imageRef.current.files[0];
    console.log('image file', file);
    if (file) {
      const result = await imageUploadService.upload(file);
      console.log('fetch result', result);
      handleChange(
        { target: { name: 'imageUrl', value: result.url } },
        info.key
      );
    }
    setModalInfo((modalInfo) => ({
      ...modalInfo,
      modalVisible: false,
    }));
  };

  console.log('cardFormlist', info.key);
  return (
    <>
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
            {info.imageUrl ? info.name : 'No Profile Image'}
          </button>
          <button className={styles.btnDelete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </li>
      <Modal
        modalType={modalInfo.modalType}
        visible={modalInfo.modalVisible}
        message={modalInfo.message}
        callback={handleModalCallback}
      ></Modal>
    </>
  );
};

export default CardFormList;
