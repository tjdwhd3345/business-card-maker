import firebase from '../firebaseInit/firebaseInit';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
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
    switch (providerName) {
      case 'Google':
        provider = new GoogleAuthProvider();
        break;
      case 'Github':
        provider = new GithubAuthProvider();
        break;
      default:
    }
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this.auth, provider);
  }

  /**
   * 사용자 로그아웃
   * @returns 로그아웃 promise
   */
  signOut() {
    return this.auth.signOut();
  }
}

export default AuthService;
