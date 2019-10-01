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
    //Simulate error
    // if (Math.random()>0.5){
    //   throw new Error('Boom!');
    // }

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
  });

export const addTodo = (text)=>
  delay(500).then(()=>{
    const todo={
      id:v4(),
      text,
      completed:false
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = (id) =>
  delay(500).then(()=>{
    const todo=fakeDatabase.todos.find(t=>t.id===id);
    todo.completed=!todo.completed;
    return todo;
  })
