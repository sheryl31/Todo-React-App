import React, { useEffect, useState } from "react";

const Form = ({ todos, setTodos, formatLists, setFormatLists, formatTodo }) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    mapFormatTodo();
  }, [todos]);

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitListHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);

    setInputText("");
  };

  const mapFormatTodo = () => {
    setFormatLists(
      formatLists.map((item) => {
        if (item.id === formatTodo.id) {
          return {
            ...item,
            todos: [...todos],
          };
        }
        return item;
      })
    );
  };

  return (
    <form>
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        placeholder="Add Todo.."
        className="form_todo_list"
      />
      <button onClick={submitListHandler} className="form_button" type="submit">
        <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

export default Form;
