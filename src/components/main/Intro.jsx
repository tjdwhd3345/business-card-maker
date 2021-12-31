import React, { useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import {
  child,
  get,
  ref,
  set,
  push,
  update,
  onChildChanged,
} from 'firebase/database';

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
    // console.log('handleOnChange', e, key);
    // 키값으로 firebase update
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

  /**
   * 접속 시 데이터 조회
   */
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
          console.log('###### db get');
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
   * @param {firebase key} key: 업데이트할 카드의 key
   */
  const handleUpdate = (e, key) => {
    const cardRef = ref(db, currentUser.uid + '/cards/' + key);
    update(cardRef, { [e.target.name]: e.target.value });
  };

  /**
   * firebase 업데이트 후 onChildChanged 리스너를 통해 preview 업데이트를 위해 state 변경
   * useEffect 사용해서 리스너는 최초 렌더링 시에만 등록
   */
  useEffect(() => {
    const refs = ref(db, currentUser.uid + '/cards/');
    onChildChanged(refs, (snapshot) => {
      const data = snapshot.val();
      // console.log('### onChildChanged:', data);
      setCards((cards) =>
        cards.map((card) => {
          if (card.key === data.key) return data;
          return card;
        })
      );
    });
  }, []);

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
          <div className={styles.controlBtn}>
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
