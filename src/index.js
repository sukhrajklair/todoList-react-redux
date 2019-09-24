import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './App.css';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

const todo = (state, action) => {
  switch(action.type){
    case 'ADD_TODO':
     return {
       id: action.id,
       text: action.text,
       completed: false
     };
    case 'TOGGLE_TODO':
      if (state.id !== action.id){
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos=(state=[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [...state, todo({},action)];
    case 'TOGGLE_TODO':
      return state.map(t=> todo(t,action));
    default:
      return state;
  }
}

const visibilityFilter = (state='SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

//combine all of the reducers into one reducer
const todoAppReducer = combineReducers({todos,visibilityFilter})
//create react store
//const todoAppStore = createStore(todoAppReducer);

//action creators : mostly for documenting the code and better organization
let nextTodoId=0;
const addTodo = (text) => {
  return{
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

const setVisibilityFilter = (filter) => {
  return{
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

const toggleTodo = (id) => {
  return{
    type: 'TOGGLE_TODO',
    id
  }
}

//React Components
const Todo =({
  onClick,
  completed,
  text
})=>(
<li
  onClick= {onClick}
  style={{
    textDecoration:
      completed?
        'line-through' :
        'none'
  }}>
  {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo=>
      <Todo
        key={todo.id}
        {...todo}
        onClick={()=>onTodoClick(todo.id)}
      />
    )}
  </ul>
)

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
//The connect function results in a container component that renders the presentational component passed to it
//It will calculate the props to be passed to the presentational component by merging the object returned from
//the mapStateToProps() and mapDispatchToProps() functions
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);
//Created this new container component to contain TodoList presentational component
//Using the connect function from react-redux, the presentational container doesn't require the explicitly defined container component anymore
// class VisibleTodoList extends React.Component{
//    ......
// }

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
AddTodo=connect()(AddTodo)

//Link is just a presentational component
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active){
    return(
      <span>{children}</span>
    );
  }
  return (
    <a href='#'
      onClick={e=> {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
//Split up FilterLink into two components: FilterLink as Container Component and Link as presentational component
//Passing the context to the Link component using connect()
const mapStateToLinkProps = (state, ownProps)=>{
  return{
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps)=>{
  return {
    onClick: ()=>{
              dispatch(setVisibilityFilter(ownProps.filter))
            }
          }
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
//The following explicitly declared container isn't required anymore as we are using
//connect() to provide the state and store to the Link component
// class FilterLink extends React.Component{
// ...
// }
// FilterLink.contextTypes={
//   store: React.PropTypes.object
// };
//Footer has been converted to a presentational component as well,
//It doesn't pass the state info to FilterLink anymore
//FilterLink gets the state itself
const Footer = ()=>(
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>All</FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED'>Complteted</FilterLink>
  </p>
)

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

//Changed AddTodo and Footer to container components
//Created a new containter component VisibleTodoList for TodoList component
//Each container component subscribe to the store directly
const TodoApp = ()=>(
  <div>
    <AddTodo  />
    <VisibleTodoList />
    <Footer />
  </div>
);

//The provider component will take the store as its props and make it available to
//its child and grandchild components using the getChildContext method availabe with React
//Provider can be imported from the react-redux library instead of declaring it in your code
// class Provider extends React.Component{
// ....
// }
//The following code is necessary for the context to work
// Provider.childContextTypes = {
//   store: React.PropTypes.object
// };

//Only need to render the app once
//The container components inside the app are indvidually subscribed to the store and render automatically whenever there is a change in the store
ReactDOM.render(
  //<TodoApp todos={todoAppStore.getState().todos} filter={todoAppStore.getState().visibilityFilter} />,
  <Provider store={createStore(todoAppReducer)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

//todoAppStore.subscribe(render);
//render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
