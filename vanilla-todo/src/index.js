import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';


// action creator
// 보통 reducer 위에 쓴다
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  };
};

// Never Mutate State
// Only way to mutate state is action 
const reducer = (state = [], action) => {
  switch(action.type){
    case ADD_TODO:
      const newToDoObj = [{ text: action.text, id: Date.now() }, ...state];
      return newToDoObj;
    case DELETE_TODO:
      const cleaned = state.filter(toDos => toDos.id !== parseInt(action.id));
      return cleaned;
    default:
      return state;
  }
}

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) =>{
  const id = e.target.parentNode.id;
  store.dispatch(deleteToDo(id));
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);

form.addEventListener('submit', onSubmit);