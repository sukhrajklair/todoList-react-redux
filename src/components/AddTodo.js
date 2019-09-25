import React from 'react';
import {addTodo} from '../actions/actions.js';
import {connect} from 'react-redux';

//Changed this back to a container component containing its own dispatch callback
let AddTodo = ({dispatch}) => {
  let input;

  return(
    <div>
      <input ref={node=>{input=node}} />
      <button onClick = {()=>{
        dispatch(addTodo(input.value));
        input.value='';
      }}>Add Todo</button>
    </div>
  )
}
//We do not need to pass mapStateToProps() becasue we do not access state in AddTodo. Hence this component will not subscribe to the store
//When nothing is passed to the connect function, it, by default, passes the dispatch function to the component
AddTodo=connect()(AddTodo);

export default AddTodo;
