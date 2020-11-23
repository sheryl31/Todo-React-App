import React, { useState } from "react";

const Form = ({ todos, setTodos }) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitListHandler = (e) => {
    e.preventDefault();
    if (inputText.length > 0) {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 },
      ]);
      setInputText("");
    }
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
