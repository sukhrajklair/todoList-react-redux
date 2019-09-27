import React, {Component} from 'react';
import {TodoList} from './TodoList.js';
import * as actions from '../actions/actions.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getVisibleTodos} from '../reducers/reducer';

class VisibleTodoList extends Component{
  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    if(this.props.filter!== prevProps.filter){
      this.fetchData();
    }
  }

  fetchData(){
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter);
  }
  render(){
    //since we have passed action object directly to connect() function, the props don't contain
    //any function called 'onTodoClick'. It only contains 'toggleTodo'. hence we destructure the
    //props to pass toggleTodo as onTodoClick props to TodoList
    const {toggleTodo, ...rest} = this.props;
    return <TodoList {...rest} onTodoClick = {toggleTodo}/>;
  }
}
const mapStateToTodoListProps = (state, ownProps) => {
  //changed the source of filter from the redux store to the it's own props. Used withRouter()
  //to inject paramas into the connected component
  const filter = ownProps.match.params.filter||'all'
  return{
    todos: getVisibleTodos(state,filter),
    filter,
  };
};

// the mapDispatchToProps function can be replaced with a simple mapping of the callback to the
//corresponding action when the arguments accepted by the callbacks are the same as the arguments
//of the action creator functions
//the following can be replaced inside the connect function with:
//{onTodoClick:toggleTodo,
// receiveTodos: receiveTodos}
// const mapDispatchToTodoListProps = (dispatch)=>{
//   return{
//     onTodoClick:todoId=>{
//       dispatch(toggleTodo(todoId));
//     },
//     receiveTodos: (filter,response)=>{
//       dispatch(receiveTodos(filter,response));
//     }
//   };
// };

//The connect function results in a container component that renders the presentational component passed to it
//It will calculate the props to be passed to the presentational component by merging the object returned from
//the mapStateToProps() and mapDispatchToProps() functions
//withRouter makes the url params
//Since we needed to add functions to fetch data inside lifecycle hooks, we declared the VisibleTodoList component
//ourselves at the top. Here we are creating a container component that wraps VisibleTodoList, and has access to
//store and passes it to VisibleTodoList. Then we are reassigning that returned component to VisibleTodoList
VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  //shorthand notation allows us to use the action object which is mapping of all of the actions inside the action.js file
  //when import * as xyz from file is used, it returns a mapping of all of the things returned from the file
  actions
)(VisibleTodoList));

export default VisibleTodoList;
