import React, { useCallback, useEffect, useState } from 'react';
import styles from './Intro.module.css';
import { useHistory } from 'react-router-dom';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import {
  ref,
  onChildChanged,
  onChildRemoved,
  onValue,
} from 'firebase/database';
import Modal from '../modal/Modal';

const Intro = ({ authService, dbService, imageUploadService }) => {
  const currentUser = authService.auth.currentUser;
  const dbApp = dbService.dbApp;
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let history = useHistory();

  useEffect(() => {
    authService.onAuthChanged((user) => {
      !user && history.push('/');
    });
    console.log('effect 1');
  });

  /**
   * 빈 카드슬롯을 추가함
   */
  const handleAddCard = () => {
    const [newKey, result] = dbService.set(currentUser.uid + '/cards');
    result.then(() => {
      setCards([
        ...cards,
        {
          name: '',
          company: '',
          position: '',
          theme: 'Light',
          email: '',
          message: '',
          imageUrl: '',
          key: newKey,
        },
      ]);
    });
  };

  /**
   * 접속 시 데이터 조회
   */
  useEffect(() => {
    dbService
      .get(currentUser.uid) //
      .then(async (result) => {
        setCards(result);
      });
    console.log('effect 2, dbSevice, currentUser.uid');
  }, [dbService, currentUser.uid]);

  /**
   * 카드 각 항목의 change 이벤트
   * @param {event} e: 키보드 이벤트
   * @param {string} key: 카드 객체의 고유 키
   */
  const handleOnChange = useCallback(
    (e, key) => {
      // console.log('handleOnChange', e, key);
      // 키값으로 firebase update
      const refPath = currentUser.uid + '/cards/' + key;
      const updateInfo = { [e.target.name]: e.target.value };
      dbService.update(refPath, updateInfo);
    },
    [currentUser.uid, dbService]
  );

  /**
   * firebase 삭제
   * @param {firebase key} key: 삭제할 카드의 key
   */
  const handleRemove = useCallback(
    (key) => {
      console.log('intro handleRemove', key);
      const refPath = currentUser.uid + '/cards/' + key;
      dbService.remove(refPath);
    },
    [currentUser.uid, dbService]
  );

  /**
   * firebase 업데이트 후 onChildChanged 리스너를 통해 preview 업데이트를 위해 state 변경
   * useEffect 사용해서 리스너는 최초 렌더링 시에만 등록
   */
  useEffect(() => {
    const refs = ref(dbApp, currentUser.uid + '/cards/');
    /* onValue(refs, (snapshot) => {
      console.log('### onValue: ', snapshot.val());
      setCards(Object.values(snapshot.val()));
    }); */
    onChildChanged(refs, (snapshot) => {
      const data = snapshot.val();
      console.log('### onChildChanged:', data);
      setCards((cards) =>
        cards.map((card) => {
          if (card.key === data.key) return data;
          return card;
        })
      );
    });
    onChildRemoved(refs, (snapshot) => {
      console.log('### onChildRemoved:');
      dbService
        .get(currentUser.uid) //
        .then(async (result) => {
          setCards(result);
        });
    });
    console.log('effect 3, currentUser.uid, dbService, dbApp');
  }, [currentUser.uid, dbService, dbApp]);

  /**
   * 로그아웃.
   * 로그아웃 성공 시 로그인페이지로 전환됨
   */
  const handleSignOut = () => {
    setModalVisible(true);
  };
  const handleModalCallback = (result) => {
    if (result === 'ok') {
      authService.signOut().then(() => {
        history.push('/');
      });
    }
    setModalVisible(false);
  };

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
          <CardMaker
            cards={cards}
            handleChange={handleOnChange}
            handleRemove={handleRemove}
            imageUploadService={imageUploadService}
          />
          <CardPreview cards={cards} />
        </div>
        <div className={styles.footer}>Code your dream</div>
      </section>
      <Modal
        modalType={'confirm'}
        visible={modalVisible}
        message={'로그아웃 하시겠습니까?'}
        callback={handleModalCallback}
      ></Modal>
    </>
  );
};

export default Intro;
