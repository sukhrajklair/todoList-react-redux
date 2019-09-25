//the following function allows you create a unique id everytime it's called. It is useful in assigning list items id in react
import { v4 } from 'node-uuid';

//action creators : mostly for documenting the code and better organization
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});
