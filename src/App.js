import React, { useState, useEffect } from "react";
import "./App.css";
import AddListForm from "./components/AddListForm";
import Popup from "./components/Popup";
import TodoList from "./components/TodoList";

function App() {
  const [formatLists, setFormatLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [seen, setSeen] = useState(false);
  const [todoContainerToggle, setTodoContainerToggle] = useState(false);
  const [activeID, setActiveID] = useState(null);
  const [edit, setEdit] = useState(false);
  const [currentList, setCurrentList] = useState(formatLists[0]);

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
    setTodoContainerToggle(!todoContainerToggle);
  };

  const deleteEmpty = () => {
    setFormatLists(formatLists.filter((el) => el.todos.length > 0));
  };

  const toggleEdit = () => {
    if (currentList && currentList.length > 0) {
      setEdit(!edit);
      setTodoContainerToggle(!todoContainerToggle);
    }
  };

  const editFormatList = (id) => {
    let formatList = formatLists.filter((item) => item.id === id);
    if (formatList && formatList.length > 0) {
      setCurrentList(formatList);
      setTodos(formatList[0].todos);
    }
    toggleEdit();
  };

  const updateFormatLists = () => {
    if (!todos.length && !todoContainerToggle) return;

    console.log("=================");
    console.log("updateFormatLists ID ", activeID);
    console.log("formatLists ", formatLists);
    console.log("todos ", todos);
    console.log("=================");
    if (activeID === null) return;

    setFormatLists(
      formatLists.map((item) => {
        if (item.id === activeID) {
          return {
            ...item,
            todos: [...todos],
          };
        }
        return item;
      })
    );
  };

  const updateCurrentList = () => {
    let formatList = formatLists.filter((item) => item.id === activeID);
    if (formatList && formatList.length > 0) {
      setCurrentList(formatList);
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    updateFormatLists();
  }, [todos]);

  useEffect(() => {
    saveLocalTodos();
    updateCurrentList();
  }, [formatLists]);

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <AddListForm
        formatLists={formatLists}
        setFormatLists={setFormatLists}
        togglePop={togglePop}
      />

      {seen ? (
        <Popup
          key={1}
          togglePop={togglePop}
          todos={todos}
          setTodos={setTodos}
          formatTodo={formatLists[formatLists.length - 1]}
          todoContainerToggle={todoContainerToggle}
          deleteEmpty={deleteEmpty}
          setActiveID={setActiveID}
          editFormatList={editFormatList}
        />
      ) : null}
      <div className="test">
        <div
          className={
            todoContainerToggle ? `hide-window` : `format-list-container`
          }
        >
          {!seen
            ? formatLists.map((item) => (
                <TodoList
                  key={item.id}
                  todos={item.todos}
                  setTodos={setTodos}
                  todoContainerToggle={todoContainerToggle}
                  setActiveID={setActiveID}
                  editFormatList={editFormatList}
                  formatTodo={item}
                />
              ))
            : null}
        </div>
        {edit ? (
          <Popup
            key={1}
            togglePop={toggleEdit}
            todos={currentList[0].todos}
            setTodos={setTodos}
            formatTodo={currentList[0]}
            todoContainerToggle={todoContainerToggle}
            deleteEmpty={deleteEmpty}
            editFormatList={editFormatList}
            setActiveID={setActiveID}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
