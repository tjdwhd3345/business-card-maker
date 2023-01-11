import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ref, onChildChanged, onChildRemoved } from 'firebase/database';
import styles from './Intro.module.css';
import CardMaker from '../cardMaker/CardMaker';
import CardPreview from '../cardPreview/CardPreview';
import Modal from '../modal/Modal';
import CardFormSkeleton from '../skeleton/CardFormSkeleton';
import CardViewSkeleton from '../skeleton/CardViewSkeleton';
import { useService } from '../../context/ServiceProvider';

const Intro = () => {
  const { authService, dbService } = useService();
  const { dbApp } = dbService;
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  let history = useHistory();
  const { userId: currentUserUid, providerName } = history.location.state;

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
    const [newKey, result] = dbService.set(currentUserUid + '/cards');
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
      .get(currentUserUid) //
      .then(async (result) => {
        // 게스트 사용자는 로그인 시 카드하나 추가
        if (providerName === 'guest') handleAddCard();
        else setCards(result);
        setIsLoaded(true);
      });

    console.log('effect 2, dbSevice, currentUserUid');
  }, [dbService, currentUserUid, providerName]);

  /**
   * 카드 각 항목의 change 이벤트
   * @param {event} e: 키보드 이벤트
   * @param {string} key: 카드 객체의 고유 키
   */
  const handleOnChange = useCallback(
    (e, key) => {
      // console.log('handleOnChange', e, key);
      // 키값으로 firebase update
      const refPath = currentUserUid + '/cards/' + key;
      const updateInfo = { [e.target.name]: e.target.value };
      dbService.update(refPath, updateInfo);
    },
    [currentUserUid, dbService]
  );

  /**
   * firebase 삭제
   * @param {firebase key} key: 삭제할 카드의 key
   */
  const handleRemove = useCallback(
    (key) => {
      console.log('intro handleRemove', key);
      const refPath = currentUserUid + '/cards/' + key;
      dbService.remove(refPath);
    },
    [currentUserUid, dbService]
  );

  /**
   * firebase 업데이트 후 onChildChanged 리스너를 통해 preview 업데이트를 위해 state 변경
   * useEffect 사용해서 리스너는 최초 렌더링 시에만 등록
   */
  useEffect(() => {
    const refs = ref(dbApp, currentUserUid + '/cards/');
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
        .get(currentUserUid) //
        .then(async (result) => {
          setCards(result);
        });
    });
    console.log('effect 3, currentUserUid, dbService, dbApp');
  }, [currentUserUid, dbService, dbApp]);

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
      // 게스트 사용자는 로그아웃 시 db에서 삭제
      if (providerName === 'guest') {
        const refPath = currentUserUid;
        dbService.remove(refPath);
      }
    }
    setModalVisible(false);
  };

  return (
    <>
      <section className={styles.loginForm}>
        <div className={styles.title}>
          <div>
            <h1>Business Card Maker</h1>
          </div>
          {providerName === 'guest' ? (
            <div className={styles.guest}>
              <span>게스트 로그인</span>
            </div>
          ) : null}
          <div className={styles.controlBtn}>
            <button className={styles.add} onClick={handleAddCard}>
              카드 추가
            </button>
            <button className={styles.signOut} onClick={handleSignOut}>
              로그아웃
            </button>
          </div>
        </div>
        <div className={styles.content}>
          {isLoaded ? (
            <>
              <CardMaker
                cards={cards}
                handleChange={handleOnChange}
                handleRemove={handleRemove}
              />
              <CardPreview cards={cards} />
            </>
          ) : (
            <>
              <CardFormSkeleton />
              <CardViewSkeleton />
            </>
          )}
        </div>
        <div className={styles.footer}>Manage your business cards</div>
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
