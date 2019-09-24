import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './App.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import throttle from 'loadash/throttle';
import {todoAppReducer} from './reducers';
import {loadSate, saveState} from './localStorage'
import TodoApp from './App'

//store and load state from the local storage
const presistedState=loadSate();
//passing the locally stored state as the initial stage
const store=createStore(todoAppReducer,presistedState)
//the throttle function from the loadash library allows us to limit how frequently a function is called
//here we are specifying that function saveState is not called more frequently than every 1000mSec
store.subscribe(throttle(()=>{
  saveState({
    todos:store.getState().todos
  });
},1000));

//The provider component will take the store as its props and make it available to
//its child and grandchild components using the getChildContext method availabe with React
//Only need to render the app once
//The container components inside the app are indvidually subscribed to the store and render automatically whenever there is a change in the store
ReactDOM.render(
  //<TodoApp todos={todoAppStore.getState().todos} filter={todoAppStore.getState().visibilityFilter} />,
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
