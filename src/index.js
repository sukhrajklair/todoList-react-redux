import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './App.css';
import {createStore, combineReducers} from 'redux';

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

//Created this new container component to contain TodoList presentational component
class VisibleTodoList extends React.Component{
  //In this app we re-render the whole application inside the render() function which is subscribed to the createStore
  //However, it's not ideal to render the whole app on a minor change in the state
  //Therefore, it makes more sense to move the subscription into individual components using lifecycle method
  componentDidMount(){
    //function to unsubscribe is returned when we call the subscribe method
    //assigning the return to this.unsubscribe field will allow us to invoke it later inside another lifecycle method
    const{store} = this.context;
    this.unsubscribe = store.subscribe(()=>
      this.forceUpdate())
  }
  //It's also important to unsubscribe inside the componentWillUnmount
  componentWillUnmount(){
    this.unsubscribe();
  }
  render(){
    const{store} = this.context;
    const props=this.props;
    const state=store.getState();

    return(
      <TodoList
        todos={getVisibleTodos(state.todos,state.visibilityFilter)}
        onTodoClick={todoId=>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: todoId})
        }
      />
    )
  }
}
//Following code is necessary to receive the context
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}

//Changed this back to a container component containing its own dispatch callback
let nextTodoId=0;
const AddTodo = (props,{store}) => {
  let input;

  return(
    <div>
      <input ref={node=>{input=node}} />
      <button onClick = {()=>{
        store.dispatch({
          type:'ADD_TODO',
          id: nextTodoId++,
          text:input.value
        })
        input.value='';
      }}>Add Todo</button>
    </div>
  )
}
AddTodo.contextTypes = {
  store: React.ProtoTypes.object
}
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
class FilterLink extends React.Component{
  //In this app we re-render the whole application inside the render() function which is subscribed to the createStore
  //However, it's not ideal to render the whole app on a minor change in the state
  //Therefore, it makes more sense to move the subscription into individual components using lifecycle method
  componentDidMount(){
    //function to unsubscribe is returned when we call the subscribe method
    //assigning the return to this.unsubscribe field will allow us to invoke it later inside another lifecycle method
    const {store}=this.context;
    this.unsubscribe = store.subscribe(()=>
      this.forceUpdate())
  }
  //It's also important to unsubscribe inside the componentWillUnmount
  componentWillUnmount(){
    this.unsubscribe();
  }
  render(){
    const props= this.props;
    const state = store.getState();
    const {store}=this.context;
    return(
      <Link
        active = {
          props.filter ===
          state.visibilityFilter
        }
        onClick = {()=>{
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}
      >
        {props.children}
      </Link>
    )
  }
}
FilterLink.contextTypes={
  store: React.ProtoTypes.object
}
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
class Provider extends React.Component{
  getChildContext(){
    return{
      store:this.props.store
    };
  }
  render(){
    return this.props.children;
  }
}
//The following code is necessary for the context to work
Provider.childContextTypes = {
  store: React.ProtoTypes.object
}

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
