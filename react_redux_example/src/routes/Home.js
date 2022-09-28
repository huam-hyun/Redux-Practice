import React, { useState } from "react";
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
    const [text, setText] = useState("");

    function onChange(e) {
        setText(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText('');
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo => <ToDo {...toDo} key={toDo.id} />)}
            </ul>
        </>
    )
}


// redux store로부터 가져온 state는 컴포넌트의 props에 들어간다
function mapStateToProps(state, ownProps) {
    return { toDos: state }
}

// redux store의 dispatch를 props에 넣어주는 함수
function mapDispatchToProps(dispatch){
    return { 
        addToDo: (text) => dispatch(actionCreators.addToDo(text))
    }
}

// connect를 통해 store와 component를 연결한다
export default connect(mapStateToProps, mapDispatchToProps)(Home);