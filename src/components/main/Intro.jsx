import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import { child, get, ref, set, push, update, onValue } from 'firebase/database';

const Intro = ({ auth, db }) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [cards, setCards] = useState([]);
  let history = useHistory();

  /**
   * 빈 카드슬롯을 추가함
   */
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
      key: newCardRef.key,
    }).then(() => {
      setCards([
        ...cards,
        {
          name: '',
          company: '',
          position: '',
          theme: '',
          email: '',
          message: '',
          key: newCardRef.key,
        },
      ]);
    });
  };

  /**
   * 카드 각 항목의 change 이벤트
   * @param {event} e: 키보드 이벤트
   * @param {string} key: 카드 객체의 고유 키
   */
  const handleOnChange = (e, key) => {
    console.log('handleOnChange', e, key);

    // TODO: 키값으로 firebase update
    handleUpdate(e, key);
  };

  /**
   * 로그아웃.
   * 로그아웃 성공 시 로그인페이지로 전환됨
   */
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
            // console.log(snapshot, snapshot.key);
            // result.push({ ...snapshot.val(), key: snapshot.key });
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

  /**
   * firebase 업데이트
   * @param {event} e: 이벤트
   * @param {firebase ref} cardRef: 업데이트할 카드의 ref
   */
  const handleUpdate = (e, key) => {
    const cardRef = ref(db, currentUser.uid + '/cards/' + key);
    update(cardRef, { [e.target.name]: e.target.value }).then(() => {
      setCards((cards) => {
        console.log('update setCards', cards, key);
        return cards.map((card) => {
          console.log(card, key, e.target.name, e.target.value);
          if (card.key === key) card[e.target.name] = e.target.value;
          return card;
        });
      });
    });
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
