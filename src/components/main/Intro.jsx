import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';

const Intro = ({ auth }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  let history = useHistory();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      history.push('/');
    });
  };

  useEffect(() => {
    if (!currentUser) history.push('/');
  }, []);

  return (
    <>
      <section className={styles.loginForm}>
        <div className={styles.title}>
          <div>
            <h2>Business Card Maker</h2>
            <h2>hi, {currentUser.displayName}. this is Intro</h2>
          </div>
          <div>
            <button className={styles.signOut} onClick={handleSignOut}>
              sign out
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div>Card Maker</div>
          <div>Card Preview</div>
        </div>
        <div className={styles.footer}>Code your dream</div>
      </section>
    </>
  );
};

export default Intro;
