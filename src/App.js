import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IConnectApp from './IConnectApp';
import Signup from './container/Signup';
import Login from './container/Login';
import Profile from './container/Profile';

const App = () => {
  return (
    <Router>
      <IConnectApp>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </IConnectApp>
    </Router>
  );
}

export default App;