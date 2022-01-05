import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/Modal';

const LoginForm = ({ authService }) => {
  let history = useHistory();

  const handleClick = (event) => {
    authService
      .signIn(event.target.textContent)
      .then((result) => {
        console.log('signInWithGoogle.then', result);
        if (result.user) {
          const { displayName, email, emailVerified } = result.user;
          console.log(displayName, email, emailVerified, result.user);
          if (emailVerified) history.push('/main');
        }
      })
      .catch((error) => {
        console.log('signInWithGoogle.catch', error);
      });
  };

  return (
    <>
      <section className={styles.loginForm}>
        <h2 className={styles.title}>Business Card Maker</h2>
        <div className={styles.content}>
          <h2>Login</h2>
          <button onClick={handleClick}>Google</button>
          <button onClick={handleClick}>Github</button>
        </div>
        <div className={styles.footer}>Code your dream</div>
      </section>
    </>
  );
};

export default LoginForm;
