import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import { child, get, ref, set } from 'firebase/database';

const Intro = ({ auth, db }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [cards, setCards] = useState([
    {
      name: 'Mo Sung Jong',
      company: 'Kakao',
      theme: 'Light',
      position: 'Software Engineer',
      email: 'msj@naver.com',
      message: 'mocci mocci.',
    },
    {
      name: 'Lee Seung Ae',
      company: 'Standard',
      theme: 'Light',
      position: 'Dental Hygienist',
      email: 'lsa@naver.com',
      message: 'im seung ae.',
    },
  ]);
  let history = useHistory();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      history.push('/');
    });
  };

  const handleTest = () => {
    /* const cardsRef = ref(db, 'cards/');
    set(cardsRef, {
      name: 'Mo Sung Jong',
      company: 'Kakao',
      theme: 'Light',
      position: 'Software Engineer',
      email: 'msj@naver.com',
      message: 'mocci mocci.',
    }); */
    const dbRef = ref(db);
    get(child(dbRef, 'cards/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
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
        <div onClick={handleTest} className={styles.footer}>
          Code your dream
        </div>
      </section>
    </>
  );
};

export default Intro;
