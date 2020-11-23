import React, { useCallback, useState, useEffect } from "react";
import Todo from "./Todo";

import styles from "./TodoList.module.css";

const TodoList = ({
  todos,
  setTodos,
  todoContainerToggle,
  setActiveID,
  editFormatList,
  formatTodo,
  changeTitleFormatLists,
  activeID,
}) => {
  const [inputText, setInputText] = useState(
    formatTodo != null ? formatTodo.text : ""
  );

  const myRef = React.createRef();

  const clickHandler = useCallback(
    (e) => {
      if (e) setActiveID(e, editFormatList(e));
      if (e) containerHandler();
    },
    [setActiveID, editFormatList]
  );

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const selectTextHandler = () => {
    myRef.current.select();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeTitleFormatLists(formatTodo, inputText);
  };

  const containerHandler = () => {
    console.log("containerHandler");
    console.log("formatTodoID " + formatTodo.id + ", activeID " + activeID);

    if (formatTodo.id === activeID && todoContainerToggle)
      return `todo-container`;
    else return `formatLists-todo-container`;
  };

  useEffect(() => {
    if (formatTodo) {
      setActiveID(formatTodo.id);
      setInputText(formatTodo.text);
    }
  }, [todoContainerToggle]);

  /*   useEffect(() => {
    containerHandler();
  }, [setActiveID]); */

  return (
    <div
      /*className={
        todoContainerToggle ? `todo-container` : `formatLists-todo-container`
      }*/
      /*className={
        formatTodo.id === setActiveID
          ? `todo-container`
          : `formatLists-todo-container`
      }*/
      className={containerHandler()}
    >
      <form onSubmit={handleSubmit}>
        {/* {formatTodo != null ? formatTodo.text : ""} */}
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          className={styles.title_todolist}
          onFocus={selectTextHandler}
          size={10}
          ref={myRef}
        ></input>
        <span onClick={selectTextHandler} className="edit-title-btn">
          <i className="fas fa-pencil-alt"></i>
        </span>
      </form>
      <div
        className="inner-container"
        onClick={() => {
          if (formatTodo && !todoContainerToggle) clickHandler(formatTodo.id);
        }}
      >
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo key={todo.id} todos={todos} setTodos={setTodos} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
