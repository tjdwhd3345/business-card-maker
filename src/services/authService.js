import firebase from '../firebaseInit/firebaseInit';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInAnonymously,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.auth = getAuth(firebase);
    this.auth.useDeviceLanguage();
    // 로그인상태 브라우저 세션으로 지속
    setPersistence(this.auth, browserSessionPersistence);
  }
  /**
   * 로그인
   * @param {string} providerName : 로그인 방식을 문자열로 받음
   * @returns 로그인팝업 promise
   */
  signIn(providerName) {
    let provider = null;
    switch (providerName.toLowerCase()) {
      case 'google':
        provider = new GoogleAuthProvider();
        break;
      case 'github':
        provider = new GithubAuthProvider();
        break;
      default:
    }
    if (provider) provider.setCustomParameters({ prompt: 'select_account' });
    if (providerName === 'guest') {
      // 익명 로그인
      return signInAnonymously(this.auth)
        .then((result) => {
          return {
            status: 'ok',
            userId: result.user.uid,
            providerName: 'guest',
          };
        })
        .catch((error) => {
          console.log('익명로그인 에러', error);
        });
    }
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('signInWithPopup then', result);
        return {
          status: 'ok',
          userId: result.user.uid,
          providerName: providerName,
        };
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.log('이미 가입된 이메일이 있음', error.credential);
          return { status: 'fail', code: 'account-exists' };
        }
      });
  }

  /**
   * 사용자 로그아웃
   * @returns 로그아웃 promise
   */
  signOut() {
    return this.auth.signOut();
  }

  onAuthChanged(onUserChanged) {
    onAuthStateChanged(this.auth, (user) => {
      onUserChanged(user);
    });
  }
}

export default AuthService;
