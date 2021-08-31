import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseInit/firebaseInit';

const Intro = () => {
  const currentUser = auth.currentUser;
  let history = useHistory();

  return (
    <>
      <h2>hi, {currentUser.displayName}. this is Intro</h2>

      <button
        onClick={() => {
          auth.signOut();
          history.push('/');
        }}
      >
        sign out
      </button>
    </>
  );
};

export default Intro;
