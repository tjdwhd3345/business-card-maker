import firebase from '../firebaseInit/firebaseInit';
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

class DbService {
  constructor() {
    this.dbApp = getDatabase(firebase);
  }

  /**
   * 새로운 카드 추가
   * @param {string} path : firebase database reference 경로
   * @returns 새로 추가된 reference의 key 와 set Promise 를 반환
   */
  set(path) {
    const listRef = ref(this.dbApp, path);
    const newCardRef = push(listRef);
    return [
      newCardRef.key,
      set(newCardRef, {
        name: '',
        company: '',
        position: '',
        theme: '',
        email: '',
        message: '',
        imageUrl: '',
        key: newCardRef.key,
      }),
    ];
  }

  /**
   * 전체 카드 조회
   * @param {string} userId : firebase auth 의 유저 id
   * @returns {array} 조회결과
   */
  async get(userId) {
    const dbRef = ref(this.dbApp);
    const snapshots = await get(child(dbRef, userId + '/cards/'));
    let result = [];
    if (snapshots.exists()) {
      snapshots.forEach((snapshot) => {
        result.push(snapshot.val());
      });
    }
    return result;
  }

  async update(path, info) {
    console.log('dbService js', path, info);
    const cardRef = ref(this.dbApp, path);
    return update(cardRef, info);
  }

  async remove(path) {
    console.log(path);
    const cardRef = ref(this.dbApp, path);
    return remove(cardRef);
  }
}

export default DbService;
