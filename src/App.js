import React, { useEffect, useState } from "react";

import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      decription: newDescription,
    };

    let upadtedTodoArr = [...allTodos];
    upadtedTodoArr.push(newTodoItem);
    setAllTodos(upadtedTodoArr);

    localStorage.setItem("todolist", JSON.stringify(upadtedTodoArr));
  };

  const handleDelteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index,1);
    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  };

  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDelteCompletedTodo = (index) => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index,1);
    localStorage.setItem("completedTodos", JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savecompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savecompletedTodo) {
      setCompletedTodos(savecompletedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>My Todo</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              placeholder="Whats's the task title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              placeholder="Whats's the task description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primaryBtn"
              type="button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.decription}</p>
                </div>
                <div>
                  <AiFillDelete
                    className="icon"
                    onClick={() => handleDelteTodo(index)}
                  />
                  <FaCheck
                    className="check-icon"
                    onClick={() => handleCompleteTodo(index)}
                  />
                </div>
              </div>
            ))}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.decription}</p>
                  <p>
                    <small>Completed on: </small>
                    {item.completedOn}
                  </p>
                </div>
                <div>
                  <AiFillDelete
                    className="icon"
                    onClick={() => handleDelteCompletedTodo(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
