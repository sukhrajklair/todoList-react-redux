import {v4} from 'node-uuid';

//this is a fake in-memory implementation of something
//that would be implemented by calling a REST serviceWorker

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: '1',
    completed: true,
  },
  {
    id: v4(),
    text: '2',
    completed: true,
  },
  {
    id: v4(),
    text: '3',
    completed: false,
  },
  {
    id: v4(),
    text: '4',
    completed: false,
  },
  {
    id: v4(),
    text: '5',
    completed: true,
  },
]
}

const delay = (ms) =>
  new Promise(resolve=>setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(()=>{
    switch(filter){
      case 'all':
        return fakeDatabase.todos;
      case 'completed':
        return fakeDatabase.todos.filter(todo=>todo.completed);
      case 'active':
        return fakeDatabase.todos.filter(todo=>!todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`)
    }
  })
