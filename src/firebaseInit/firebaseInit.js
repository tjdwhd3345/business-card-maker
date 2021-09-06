import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebase = initializeApp(firebaseConfig);

getAuth(firebase).useDeviceLanguage();
// 로그인상태 브라우저 세션으로 지속
setPersistence(getAuth(firebase), browserSessionPersistence);
export const auth = getAuth(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getDatabase(firebase);

export default firebase;
