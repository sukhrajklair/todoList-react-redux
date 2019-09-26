import {createStore} from 'redux';
import throttle from 'lodash/throttle';
import reducer from './reducers/reducer';
import {loadSate, saveState} from './localStorage'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  //if the browser doesn't support console.group API, return the dispatch method as is
  if (!console.group){
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray', store.getState());
    console.log('%c action', 'color:blue', action);
    //call the stor's dispatch method and store the return value to return later
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color:green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}
const configureStore = () => {
  //store and load state from the local storage
  const presistedState=loadSate();
  //passing the locally stored state as the initial stage
  const store=createStore(reducer,presistedState)

  //if not in production mode, keep the dispatch method as is
  if (process.env.NODE_ENV!=='production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  //the throttle function from the loadash library allows us to limit how frequently a function is called
  //here we are specifying that function saveState is not called more frequently than every 1000mSec
  store.subscribe(throttle(()=>{
    saveState({
      todos:store.getState().todos
    });
  },1000));

  return store;
};

export default configureStore;
