import React, { useCallback } from "react";
import Todo from "./Todo";

const TodoList = ({
  todos,
  setTodos,
  todoContainerToggle,
  setActiveID,
  editFormatList,
  formatTodo,
}) => {
  const clickHandler = useCallback(
    (e) => {
      if (e) setActiveID(e, editFormatList(e));
    },
    [setActiveID, editFormatList]
  );

  return (
    <div
      className={
        todoContainerToggle ? `todo-container` : `formatLists-todo-container`
      }
      onClick={() => {
        if (formatTodo && !todoContainerToggle) clickHandler(formatTodo.id);
      }}
    >
      <div className="title-todolist">
        {formatTodo != null ? formatTodo.text : ""}
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todos={todos} setTodos={setTodos} todo={todo} />
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
