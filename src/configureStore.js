import {createStore} from 'redux';
import throttle from 'lodash/throttle';
import {reducer} from './reducers/reducer';
import {loadSate, saveState} from './localStorage'

const configureStore = () => {
  //store and load state from the local storage
  const presistedState=loadSate();
  //passing the locally stored state as the initial stage
  const store=createStore(reducer,presistedState)
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
