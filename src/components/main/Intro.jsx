import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';

const Intro = ({ auth }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [cards, setCards] = useState([
    {
      name: 'Mo Sung Jong',
      company: 'Kakao',
      theme: 'Light',
      position: 'Software Engineer',
      email: 'tjdwhd3345@naver.com',
      message: 'mocci mocci.',
    },
    {
      name: 'Lee Seung Ae',
      company: 'Standard',
      theme: 'Light',
      position: 'Dental Hygienist',
      email: 'lsa0435@naver.com',
      message: 'im seung ae.',
    },
  ]);
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
            <h1>Business Card Maker</h1>
            <h1>hi, {currentUser.displayName}. this is Intro</h1>
          </div>
          <div>
            <button className={styles.signOut} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <CardMaker cards={cards} />
          <CardPreview cards={cards} />
        </div>
        <div className={styles.footer}>Code your dream</div>
      </section>
    </>
  );
};

export default Intro;
