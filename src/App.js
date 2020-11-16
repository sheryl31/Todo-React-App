import React, { useState, useEffect } from "react";
import "./App.css";
import AddListForm from "./components/AddListForm";
import Popup from "./components/Popup";

function App() {
  const [formatLists, setFormatLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
    console.log("save localtodos");
  }, [formatLists, seen]);

  const saveLocalTodos = () => {
    localStorage.setItem("formatLists", JSON.stringify(formatLists));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("formatLists") === null) {
      localStorage.setItem("formatLists", JSON.stringify([]));
    } else {
      let localformatLists = JSON.parse(localStorage.getItem("formatLists"));
      setFormatLists(localformatLists);
    }
  };
  const togglePop = () => {
    setSeen(!seen);
    setTodos([]);
    console.log("togglePop");
  };

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <AddListForm
        formatLists={formatLists}
        setFormatLists={setFormatLists}
        todos={todos}
        setTodos={setTodos}
        togglePop={togglePop}
      />

      {seen ? (
        <Popup
          key={formatLists[formatLists.length - 1].id}
          togglePop={togglePop}
          todos={todos}
          setTodos={setTodos}
          formatTodo={formatLists[formatLists.length - 1]}
          formatLists={formatLists}
          setFormatLists={setFormatLists}
        />
      ) : null}
    </div>
  );
}

export default App;
