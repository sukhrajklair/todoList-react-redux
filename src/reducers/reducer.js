import {combineReducers} from 'redux';
import todos, * as fromTodos from './todos';


//combine all of the reducers into one reducer
const reducer = combineReducers({todos})

export default reducer;

export const getVisibleTodos = (state,filter)=>
  fromTodos.getVisibleTodos(state.todos, filter)
