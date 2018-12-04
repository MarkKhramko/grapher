import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

const store = configureStore();

ReactDOM.render(
  	
	<Provider store={store}>
    	<App />
	</Provider>,
  document.getElementById("root")
);
registerServiceWorker();
