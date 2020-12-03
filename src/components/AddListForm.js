import React, { useState } from "react";

import styles from "./AddListForm.module.css";

const AddListForm = ({ formatLists, setFormatLists, togglePop }) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitListHandler = (e) => {
    e.preventDefault();
    setFormatLists([
      ...formatLists,
      { text: inputText, id: Math.random() * 1000, todos: [] },
    ]);
    setInputText("");
    togglePop();
  };

  return (
    <form>
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className={styles.form_todo_list}
        placeholder="Add New List Name.."
        id="name"
      />
      <button onClick={submitListHandler} type="submit" className="form_button">
        <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

export default AddListForm;
