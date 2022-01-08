import React, { useEffect } from 'react';
import styles from './LoginForm.module.css';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ authService }) => {
  let history = useHistory();

  const goToMain = (userId) => {
    history.push({
      pathname: '/main',
      state: userId,
    });
  };

  const handleSignIn = (event) => {
    authService
      .signIn(event.target.textContent)
      .then((result) => {
        console.log('signInWithGoogle.then', result);
        if (result.user) {
          const { displayName, email, emailVerified } = result.user;
          console.log(displayName, email, emailVerified, result.user);
          if (emailVerified) goToMain(result.user.uid);
        }
      })
      .catch((error) => {
        console.log('signInWithGoogle.catch', error);
      });
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
          <h2>Login</h2>
          <button onClick={handleSignIn}>Google</button>
          <button onClick={handleSignIn}>Github</button>
        </div>
        <div className={styles.footer}>Code your dream</div>
      </section>
    </>
  );
};

export default LoginForm;
