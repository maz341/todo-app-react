import React from "react";
import '../css/TodoList.css'
import { useState } from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TodoListComponent = () => {

    const [todos, setTodos] = useState<string[]>([]);
    const [inputData, setInputData] = useState("");

    const addIntoListMethod = (e) => {
        e.preventDefault();

        if(inputData==""){
            alert("Please enter Data");return;
        }
        setTodos([...todos, inputData]);
        setInputData("");
    }
    const removeItem = (e) => {
        console.log(`removeItem ${e}`)
        setTodos(todos.filter(item => item !== e));
    }

    function submitWithEnter(event) {
        if (event.keyCode === 13) {
            addIntoListMethod(event);
        }
    }

    function renderList() {
        return todos.map((todo, index) =>
            <SingleTodoCompo key={index} todo={todo} removeItem={removeItem} />
        )
    }


    return (
        <div id="root">
            <div id="form">
                <h2 className="headingH1">Your Tasker</h2>
                <div>
                    <input value={inputData} onChange={(myChange) => setInputData(myChange.target.value)} className="inputClass" onKeyDown={(e) => submitWithEnter(e)} type="text" placeholder="Please Enter Task" />
                    <button className="saveBtn" onClick={addIntoListMethod}>Save</button>
                </div>
                {
                    todos.length >= 1
                        ?
                        <div className="renderList">
                            {renderList()}
                        </div>
                        :
                        <EmptyComponent />
                }
            </div>
        </div>
    );
}

const EmptyComponent = () =>
    <div className="emptyListClass">
        <img src="./src/assets/empty_list.png" alt="Empty List Image" />
        <p className="headingH1" >The list is empty</p>
    </div>

const SingleTodoCompo = (props) => {
    return (
        <div className="singleTodoItem">
            <div className="itemName">{props.todo}</div>            
            <FontAwesomeIcon className="fontIcon"  icon={faTrash} onClick={() => props.removeItem(props.todo)}/>
        </div>
    );
}


export default TodoListComponent;
