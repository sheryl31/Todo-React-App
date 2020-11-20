import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

const Popup = ({
  togglePop,
  todos,
  setTodos,
  formatTodo,
  todoContainerToggle,
  deleteEmpty,
  setActiveID,
  editFormatList,
}) => {
  const handleClick = () => {
    togglePop();
    deleteEmpty();
    console.log("handleClick");
  };

  return (
    <div className="modal">
      <div className="popup_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <div className="list-container">
          <Form
            todos={todos}
            setTodos={setTodos}
            formatTodo={formatTodo}
            setActiveID={setActiveID}
          />
          <TodoList
            key={formatTodo.id}
            todos={todos}
            setTodos={setTodos}
            todoContainerToggle={todoContainerToggle}
            setActiveID={setActiveID}
            editFormatList={editFormatList}
            formatTodo={formatTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
