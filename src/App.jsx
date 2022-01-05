import styles from './App.module.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import Intro from './components/main/Intro';
import React from 'react';

const App = ({ authService, dbService, imageUploadService }) => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/login']} exact>
            <LoginForm authService={authService} />
          </Route>
          <Route path='/main' exact>
            <Intro
              authService={authService}
              dbService={dbService}
              imageUploadService={imageUploadService}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
