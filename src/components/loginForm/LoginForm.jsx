import React, { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/Modal';
import { useService } from '../../context/ServiceProvider';

const LoginForm = () => {
  const { authService } = useService();
  let history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const goToMain = (userId, providerName) => {
    history.push({
      pathname: '/main',
      state: { userId: userId, providerName: providerName },
    });
  };

  const handleSignIn = async (event) => {
    const { status, userId, providerName } = await authService.signIn(
      event.target.name
    );
    if (status === 'ok') goToMain(userId, providerName);
    else setModalVisible(true);
  };
  const handleModalCallback = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    authService.onAuthChanged((user) => {
      user && goToMain(user.uid);
    });
  });

  return (
    <>
      <section className={styles.loginForm}>
        <h2 className={styles.title}>Business Card Maker</h2>
        <div className={styles.content}>
          <h2>로그인</h2>
          <button onClick={handleSignIn} name='google'>
            Google 로그인
          </button>
          <button onClick={handleSignIn} name='github'>
            Github 로그인
          </button>
          <button onClick={handleSignIn} name='guest'>
            게스트 로그인
          </button>
        </div>
        <div className={styles.footer}>Manage your business cards</div>
      </section>
      <Modal
        modalType={'confirm'}
        visible={modalVisible}
        message={'해당 이메일 주소는 사용중입니다.'}
        callback={handleModalCallback}
      ></Modal>
    </>
  );
};

export default LoginForm;
