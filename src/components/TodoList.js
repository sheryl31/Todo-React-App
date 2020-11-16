import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {
  const myRef = React.createRef();

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /*   React.useEffect((e) => {
    if (e && myRef.current) {
      executeScroll();
    }
  }); */

  return (
    <div ref={myRef} className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todos={todos} setTodos={setTodos} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
