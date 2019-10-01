//changed the state structure from a list of todos to a tree like structure of todos
const byId=(state={}, action) => {
  if (action.response){
    return{
      ...state,
      ...action.response.entities.todos
    }
  }

  return state;
  // switch(action.type){
  //   case 'FETCH_TODOS_SUCCESS':
  //     action.response.forEach(todo=>{
  //       state = {...state,
  //           [todo.id]:todo}
  //     });
  //     return state;
  //   case 'ADD_TODO_SUCCESS':
  //     const todo = action.response;
  //     state = {...state,
  //           [todo.id]:todo
  //         };
  //     return state;
  //   default:
  //     return state;
}

export default  byId;

export const getTodo = (state,id)=> state[id];
