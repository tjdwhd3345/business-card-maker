import logo from './logo.svg';
import styles from './App.module.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm/LoginForm';
import { auth, signInWithGoogle } from './firebaseInit/firebaseInit';
import Intro from './main/intro';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/login']} exact>
            <LoginForm auth={auth} signInWithGoogle={signInWithGoogle} />
          </Route>
          <Route path='/main' exact>
            <Intro />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
