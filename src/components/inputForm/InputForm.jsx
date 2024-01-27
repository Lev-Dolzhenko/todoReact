import Cover from "../cover/Cover";
import { useState, useEffect } from "react";

import plusIcon from "./../../content/InputForm/plus.svg";
import deleteIcon from "./../../content/Task/trashIcon.svg";

import "./InputForm.css";
import ButtonTheme from "../buttonTheme/ButtonTheme";

function InputForm() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [solved, setSolved] = useState(true);

  /* solved/unsolved task */

  const solvedTask = (todo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, solved: !item.solved} ;
        }
        return item
      })
      localStorage.setItem(`id_${todo.id}`, JSON.stringify(updatedTodos.find((item) => item.id === todo.id)));
      return updatedTodos;
    })
  }

  useEffect(() => {
    const updateLocalStorage = () => {
      todos.forEach((todo) => {
        localStorage.setItem(`id_${todo.id}`, JSON.stringify(todo));
      });
    };
    updateLocalStorage();
  }, [todos]);
  
  
  /* solved/unsolved task */

  /* spectating for input */

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  /* spectating for input */

  /* adding task to local storage */

  const addTask = (e) => {
    e.preventDefault();
    const newTodo = { id: Math.random(), title: inputValue, solved: false };
    setTodos([...todos, newTodo]);
    localStorage.setItem(`id_${newTodo.id}`, JSON.stringify(newTodo));
    setInputValue("");
  };

  /* adding task to local storage */

  /* upload local storage */

  useEffect(() => {
    const uploadTodos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      uploadTodos.push(JSON.parse(localStorage[key]));
    }
    setTodos(uploadTodos);
  }, []);

  /* upload local storage */

  const deleteTask = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
    localStorage.removeItem(`id_${todoId}`);
  };

  return (
    <>
      <form className="form">
        <input
          className="form__input"
          type="text"
          placeholder="My task"
          onChange={handleChangeInput}
          value={inputValue}
        />
        <button onClick={addTask} className="form__button">
          Add <img src={plusIcon} alt="add" />
        </button>
      </form>
      <div className="counters__wrapper">
        <div className="counters__wrapper_all">
          <p>
            Total tasks <span>{todos.length}</span>
          </p>
        </div>
        <div className="counters__wrapper_solved">
          <p>
            Solved tasks <span>{todos.length !== 0 ? `${todos.filter((todo) => todo.solved === true).length} of ${todos.length}` : 0}</span>
          </p>
        </div>
      </div>
      {todos.length == 0 ? <Cover /> : null}
      <ul className="form__list">
        {todos.map((todo) => (
          <li className="form__list_item" key={todo.id}>
            <input
              id={todo.id}
              className="list_item_checkbox"
              type="checkbox"
              onClick={() => solvedTask(todo)}
            />
            <label htmlFor={todo.id} className="list_item_title">
              {todo.title}
            </label>
            <button onClick={() => deleteTask(todo.id)}>
              <img src={deleteIcon} alt="delete task" />
            </button>
          </li>
        ))}
      </ul>
      <ButtonTheme />
    </>
  );
}

export default InputForm;
