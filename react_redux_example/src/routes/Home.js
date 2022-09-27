import React, { useState } from "react";
import { connect } from 'react-redux';

function Home({ toDos }) {
    const [text, setText] = useState("");
    
    function onChange(e) {
        setText(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(text);
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {JSON.stringify(toDos)}
            </ul>
        </>
    )
}


// redux store로 부터 가져온 state는 컴포넌트의 props에 들어간다
function mapStateToProps(state, ownProps) {
    return { toDos: state }
}

// connect를 통해 store와 component를 연결한다
export default connect(mapStateToProps)(Home);