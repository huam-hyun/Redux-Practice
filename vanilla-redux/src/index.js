import { createStore } from 'redux';

const plus = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

// reducer 유일하게 data를 바꿀 수 있는 곳
const countModifier = (count = 0, action) => {
  if(action.type === 'ADD'){
    return count + 1;
  } else if(action.type === 'MINUS'){
    return count - 1;
  } else{
    return count;
  }
}

// createStore와 함께 reducer 함수를 주면 dispatch시 자동으로 reducer함수로 연결해줌
const countStore = createStore(countModifier); 

// dispatch를 통해 reducer로 action을 줄 수 있다.(반드시 객체 형태로 주어야 함)
countStore.dispatch({ type: 'ADD' });
countStore.dispatch({ type: 'MINUS' });

console.log(countStore.getState());