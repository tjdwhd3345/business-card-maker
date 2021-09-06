import logo from './logo.svg';
import styles from './App.module.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { auth, signInWithGoogle, db } from './firebaseInit/firebaseInit';
import LoginForm from './components/loginForm/LoginForm';
import Intro from './components/main/Intro';
import React from 'react';

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/login']} exact>
            <LoginForm auth={auth} signInWithGoogle={signInWithGoogle} />
          </Route>
          <Route path='/main' exact>
            <Intro auth={auth} db={db} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
