import React, { useEffect } from "react";
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
  changeTitleFormatLists,
}) => {
  const handleClick = () => {
    togglePop();
    deleteEmpty();
    console.log("handleClick");
  };

  // scroll to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="modal">
      <div className="popup_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <div className="list-container">
          <Form todos={todos} setTodos={setTodos} />
          <div className="todo-container">
            <TodoList
              key={formatTodo.id}
              todos={todos}
              setTodos={setTodos}
              todoContainerToggle={todoContainerToggle}
              setActiveID={setActiveID}
              editFormatList={editFormatList}
              formatTodo={formatTodo}
              changeTitleFormatLists={changeTitleFormatLists}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
