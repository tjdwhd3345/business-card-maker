import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ auth, signInWithGoogle }) => {
  let history = useHistory();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const { displayName, email, emailVerified } = user;
      console.log(displayName, email, emailVerified);
      if (emailVerified) history.push('/main');
    }
  });
  
  return (
    <>
      <section>
        <h2>Business Card Maker</h2>
        <div>
          <h2>Login</h2>
          <button onClick={signInWithGoogle}>Google</button>
          <button>Github</button>
        </div>
        <div>Code your dream</div>
      </section>
    </>
  );
};

export default LoginForm;
