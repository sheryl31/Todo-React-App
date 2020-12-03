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
}) => {
  const [inputText, setInputText] = useState(
    formatTodo != null ? formatTodo.text : ""
  );

  const myRef = React.createRef();

  const clickHandler = useCallback(
    (e) => {
      if (e) setActiveID(e, editFormatList(e));
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

  useEffect(() => {
    if (formatTodo) {
      setActiveID(formatTodo.id);
    }
  }, [todoContainerToggle]);

  useEffect(() => {
    if (formatTodo) setInputText(formatTodo.text);
  }, [formatTodo]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <ul className="todo-list" key={formatTodo.id}>
          {todos.map((todo) => (
            <Todo key={todo.id} todos={todos} setTodos={setTodos} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
