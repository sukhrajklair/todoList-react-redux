import {createStore} from 'redux';
import reducer from './reducers/reducer';

const logger = (store) => {
  return(next) => {
    //if the browser doesn't support console.group API, return the dispatch method as is
    if (!console.group){
      return next;
    }
    console.log(next);
    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color:gray', store.getState());
      console.log('%c action', 'color:blue', action);
      //call the stor's dispatch method and store the return value to return later
      const returnValue = next(action);
      console.log('%c next state', 'color:green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    }
  }
}

const promise = (store)=>{
  return(next) => {
    //return a new dispatch function
    return (action) => {
      //if the action is a promise then first let the promise resolve and then call dispatch with
      //the return from the promise
      if (typeof action.then === 'function'){
        return action.then(next);
      }
      //if action is not a promise then simply call dispatch with the action
      return next(action);
    }
  }
}

const wrapDispatchWithMiddlewares = (store,middlewares) => {
  //reverse the array to make sure the function that's added first is processed at the end
  middlewares.slice().reverse().forEach(middleware=>
    store.dispatch = middleware(store)(store.dispatch)
  );
}

const configureStore = () => {
  //passing the locally stored state as the initial stage
  const store=createStore(reducer)
  //passing promise as a first middleware to make sure it's executed at last
  const middlewares = [promise];
  //if not in production mode, keep the dispatch method as is
  if (process.env.NODE_ENV!=='production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
};

export default configureStore;
