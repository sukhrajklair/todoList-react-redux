import React from 'react';
import {TodoList} from './TodoList.js';
import {toggleTodo} from '../actions/actions.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getVisibleTodos} from '../reducers/reducer';


const mapStateToTodoListProps = (state, ownProps) => {
  //changed the source of filter from the redux store to the it's own props. Used withRouter()
  //to inject paramas into the connected component
  return{
    todos: getVisibleTodos(state,ownProps.match.params.filter||'all')
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
//withRouter makes the url params
export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList));
