import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WindowActions from './actions/WindowActions';

import './App.css'

import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';

class App extends Component {

  constructor(props){
    super(props);

    this.state={}
  }

  componentWillMount(){
    this._updateDimensions();
  }

  _updateDimensions() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    this.props.windowActions.setWindowDimensions({ windowWidth, windowHeight });
  }

  componentDidMount() {
    window.addEventListener("resize", this._updateDimensions.bind(this));
  }

  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    windowActions: bindActionCreators(WindowActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
