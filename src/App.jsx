import styles from './App.module.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Router from './Router/Router';

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
