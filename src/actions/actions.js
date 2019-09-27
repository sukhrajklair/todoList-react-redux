//the following function allows you create a unique id everytime it's called. It is useful in assigning list items id in react
import { v4 } from 'node-uuid';
import * as api from '../api';

const receiveTodos = (filter, response)=>({
  type:'RECEIVE_TODOS',
  filter,
  response,
});

export const fetchTodos = (filter)=>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter,response)
);

//action creators : mostly for documenting the code and better organization
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});
