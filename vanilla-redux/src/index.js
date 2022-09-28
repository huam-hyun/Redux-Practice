import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

// dispatch에 쓸 문자열은 사람인지라 오타가 날 수 있어서 const로 선언해 두면 오타날시 컴파일러가 정의되지 않았다고 알려준다
// 하지만 정의해두지 않으면 오타나면 모름 안알려줘서
const ADD = 'ADD';
const MINUS = 'MINUS';

// reducer 유일하게 data를 바꿀 수 있는 곳
// reducer가 return 하는 것은 데이터 값이 된다
const countModifier = (count = 0, action) => {
  // if, else를 써도 되지만 swtich가 가독성이 좋다.
  switch(action.type){
    case 'ADD':
      return count + 1;
    case 'MINUS':
      return count - 1;
    default:
      return count;
  }
}

// createStore와 함께 reducer 함수를 주면 dispatch시 자동으로 reducer함수로 연결해줌
const countStore = createStore(countModifier); 

const onChange = () =>{
  number.innerText = countStore.getState();
}

// subscribe는 store의 변화를 감지해 함수를 실행한다
countStore.subscribe(onChange);

// dispatch를 통해 reducer로 action을 줄 수 있다.(반드시 객체 형태로 주어야 함)
// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'MINUS' });

const handleAdd = () =>{
  // dispatch에 들어가는 type은 이름을 바꿀 수 없다
  countStore.dispatch({ type: ADD })
}

const handleMinus = () =>{
  countStore.dispatch({ type: MINUS })
}

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);