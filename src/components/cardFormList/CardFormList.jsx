import React, { memo, useRef, useState } from 'react';
import { useService } from '../../context/ServiceProvider';
import Modal from '../modal/Modal';
import styles from './CardFormList.module.css';

const CardFormList = memo(({ info, handleChange, handleRemove }) => {
  const { imageUploadService } = useService();
  const themeOptions = [
    { value: 'Light', name: 'LightTheme' },
    { value: 'Dark', name: 'DarkTheme' },
    { value: 'Colorful', name: 'ColorfulTheme' },
  ];
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
    console.log('delete', info.key);
    setModalInfo(() => ({
      modalType: 'confirm',
      modalVisible: true,
      message: '삭제하시겠습니까?',
    }));
  };
  const handleModalCallback = (result) => {
    if (result === 'ok') {
      handleRemove(info.key);
    }
    setModalInfo((modalInfo) => ({
      ...modalInfo,
      modalVisible: false,
    }));
  };

  /**
   * 버튼 클릭 시 input click 이벤트 실행
   * @param {event} event
   */
  const onBtnClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  /**
   * 프로필 이미지 업로드 및 변경
   */
  const onImageFileChange = async () => {
    setModalInfo(() => ({
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
      <li className={styles.formWrap} key={info.key}>
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
          <select name='theme' onChange={handleInputChange} value={info.theme}>
            {themeOptions.map((themeOption, i) => (
              <option value={themeOption.value} key={i}>
                {themeOption.value}
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
            {info.imageUrl ? '프로필사진 변경' : '프로필사진 추가하기'}
          </button>
          <button className={styles.btnDelete} onClick={handleDelete}>
            삭제
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
});

export default CardFormList;
