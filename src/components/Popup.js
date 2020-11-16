import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

const Popup = ({
  togglePop,
  todos,
  setTodos,
  formatTodo,
  formatLists,
  setFormatLists,
}) => {
  const handleClick = () => {
    togglePop();
    console.log("handleClick");
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <div className="list-container">
          <Form
            todos={todos}
            setTodos={setTodos}
            formatLists={formatLists}
            setFormatLists={setFormatLists}
            formatTodo={formatTodo}
          />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
