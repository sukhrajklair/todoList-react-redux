import React from 'react';
import {VisibleTodoList} from './VisibleTodoList'
import AddTodo from './AddTodo'
import {Footer} from './Footer'

//Changed AddTodo and Footer to container components
//Created a new containter component VisibleTodoList for TodoList component
//Each container component subscribe to the store directly
const App = ()=>(
  <div>
    <AddTodo  />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
