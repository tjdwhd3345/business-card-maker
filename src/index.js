import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './services/authService';
import DbService from './services/dbService';

const authService = new AuthService();
const dbService = new DbService();
ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} dbService={dbService} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
