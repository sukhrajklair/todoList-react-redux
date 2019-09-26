import React,{PropTypes} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';

//the optional(?) parameter in the path will be passed to the App component as match props
// and can be accessed as match.params.filter
const Root = ({store})=>(
  <Provider store={store}>
  <BrowserRouter >
    <Route path="/:filter?" component={App} />
  </BrowserRouter>
  </Provider>
);

export default Root;
