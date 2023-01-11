import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../components/loginForm/LoginForm';
import Intro from '../components/main/Intro';
import { ServiceProvider } from '../context/ServiceProvider';

function Router() {
  return (
    <Switch>
      <ServiceProvider>
        <Route path={['/', '/login']} exact>
          <LoginForm />
        </Route>
        <Route path='/main' exact>
          <Intro />
        </Route>
      </ServiceProvider>
    </Switch>
  );
}

export default Router;
