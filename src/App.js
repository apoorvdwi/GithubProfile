import React, { Component } from 'react';
import { Dashboard, Login, Error } from './pages';
import { auth } from './firebase/firebase.utils';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  UnsubscribeFromAuth = null;

  componentDidMount() {
    this.UnsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.UnsubscribeFromAuth();
  }

  render() {
    return auth.currentUser ? (
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="*" component={Error} />
        </Switch>
      </div>
    ) : (
      <Login />
    );
  }
}

export default App;
