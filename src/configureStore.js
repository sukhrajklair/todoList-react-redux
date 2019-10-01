import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers/reducer';
import logger from 'redux-logger';

//thunk middleware is available as npm module 'redux-thunk'
// const thunk = (store)=>(next)=>(action)=>
//   typeof action === 'function'?
//     action(store.dispatch,store.getState) :
//     next(action);

const configureStore = () => {
  //passing promise as a first middleware to make sure it's executed at last
  const middlewares = [thunk];
  //if not in production mode, keep the dispatch method as is
  if (process.env.NODE_ENV!=='production') {
    middlewares.push(logger);
  }
  //passing the locally stored state as the initial stage
  return createStore(
    reducer,
//    presistedState, // no presisted state
    applyMiddleware(...middlewares) //optional enhancers
  )
};

export default configureStore;
