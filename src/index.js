import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './components/Root'
import configureStore from './configureStore';
const store = configureStore();

//The provider component will take the store as its props and make it available to
//its child and grandchild components using the getChildContext method availabe with React
//Only need to render the app once
//The container components inside the app are indvidually subscribed to the store and render automatically whenever there is a change in the store
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
