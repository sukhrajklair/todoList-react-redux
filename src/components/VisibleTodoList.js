import React from 'react';
import {TodoList} from './TodoList.js';
import {toggleTodo} from '../actions/actions.js';
import {connect} from 'react-redux';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t=>t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t=>!t.completed);
    default:
      return todos
  }
}

const mapStateToTodoListProps = (state) => {
  return{
    todos: getVisibleTodos(state.todos,state.visibilityFilter)
  };
};

const mapDispatchToTodoListProps = (dispatch)=>{
  return{
    onTodoClick:todoId=>{
      dispatch(toggleTodo(todoId));
    }
  }
}
//Created this new container component to contain TodoList presentational component
//Using the connect function from react-redux, the presentational container doesn't require the explicitly defined container component anymore
// class VisibleTodoList extends React.Component{
//    ......
// }
//The connect function results in a container component that renders the presentational component passed to it
//It will calculate the props to be passed to the presentational component by merging the object returned from
//the mapStateToProps() and mapDispatchToProps() functions
export const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);
