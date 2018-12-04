import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import * as Routes from '../constants/Routes';

import HomeScreen from '../screens/HomeScreen';

export default class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path={ Routes.MAIN } component={ HomeScreen }/>
        </Switch>
      </main>
    );
  }
}