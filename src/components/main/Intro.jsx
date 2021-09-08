import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import { child, get, ref, set, push } from 'firebase/database';

const Intro = ({ auth, db }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [cards, setCards] = useState([]);
  let history = useHistory();

  const handleAddCard = () => {
    const listRef = ref(db, currentUser.uid + '/cards');
    const newCardRef = push(listRef);
    set(newCardRef, {
      name: '',
      company: '',
      position: '',
      theme: '',
      email: '',
      message: '',
    });
  };

  const handleOnChange = (e) => {
    console.log('handleOnChange', e.target.value);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      history.push('/');
    });
  };

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, currentUser.uid + '/cards/'))
      .then((snapshots) => {
        // console.log('snapshots', snapshots, snapshots.ref);
        const result = [];
        if (snapshots.exists()) {
          // console.log(snapshots.val());
          snapshots.forEach((snapshot) => {
            // console.log(snapshot.val());
            result.push(snapshot.val());
          });
          console.log('db get');
          setCards(result);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = () => {
    /* const cardsRef = ref(db, 'cards/');
    set(cardsRef, {
      name: 'Mo Sung Jong',
      company: 'Kakao',
      theme: 'Light',
      position: 'Software Engineer',
      email: 'msj@naver.com',
      message: 'mocci mocci.',
    }); */
  };

  useEffect(() => {
    /* console.log(currentUser.uid);
    currentUser.getIdToken().then((ret) => {
      console.log(ret);
    });
    currentUser.getIdTokenResult().then((ret) => {
      console.log(ret);
    }); */
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
            <button className={styles.add} onClick={handleAddCard}>
              Add Card
            </button>
            <button className={styles.signOut} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <CardMaker cards={cards} handleChange={handleOnChange} />
          <CardPreview cards={cards} />
        </div>
        <div onClick={handleUpdate} className={styles.footer}>
          Code your dream
        </div>
      </section>
    </>
  );
};

export default Intro;
