import react from "react";
import React, { useState, useEffect, useCallback } from "react";
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
    console.log("formatLists ----- ", formatLists);
    setSeen(!seen);
    setTodos([]);
    setActiveID(null);
    setTodoContainerToggle(!todoContainerToggle);
    console.log("toggle pop");
    console.log("formatLists ----- ", formatLists);
  };

  const deleteEmpty = () => {
    console.log("before delete formatLists ----- ", formatLists);

    setFormatLists(formatLists.filter((el) => el.todos.length > 0));
    console.log("after formatLists ----- ", formatLists);
  };

  const toggleEdit = () => {
    if (currentList && currentList.length > 0) {
      setEdit(!edit);
      setTodoContainerToggle(!todoContainerToggle);
    }
  };

  const editFormatList = (id) => {
    console.log("editformatList");
    console.log("formatLists ", formatLists);
    let formatList = formatLists.filter((item) => item.id === id);
    console.log("formatList ", formatList);
    if (formatList && formatList.length > 0) {
      setCurrentList(formatList);
      setTodos(formatList[0].todos);
    }
    toggleEdit();
  };

  const updateFormatLists = () => {
    console.log("updateFormatLists");
    console.log("activeID ", activeID);
    console.log(
      "todos length: " +
        todos.length +
        ", containertoggle " +
        todoContainerToggle
    );
    console.log("formatLists ", formatLists);
    console.log("todos ", todos);
    if (!todos.length && !todoContainerToggle) return;

    console.log("=================");
    console.log("updateFormatLists ID ", activeID);
    console.log("formatLists ", formatLists);
    console.log("todos ", todos);
    console.log("=================");
    if (activeID === null) return;

    console.log("activeID: ", activeID);
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

  const changeTitleFormatLists = useCallback((cur_formatTodo, text) => {
    console.log("changeTitleFormatLists");
    setFormatLists(
      formatLists.map((item) => {
        if (item.id === cur_formatTodo.id) {
          return {
            ...item,
            text: text,
          };
        }
        return item;
      })
    );
  });

  const updateCurrentList = () => {
    console.log("updateCurrentlist ", activeID);
    if (!activeID) return;
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
          changeTitleFormatLists={changeTitleFormatLists}
          activeID={activeID}
        />
      ) : null}
      <div>
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
                  changeTitleFormatLists={changeTitleFormatLists}
                  activeID={activeID}
                />
              ))
            : null}
        </div>
        {edit ? (
          <Popup
            key={2}
            togglePop={toggleEdit}
            todos={currentList[0].todos}
            setTodos={setTodos}
            formatTodo={currentList[0]}
            todoContainerToggle={todoContainerToggle}
            deleteEmpty={deleteEmpty}
            editFormatList={editFormatList}
            setActiveID={setActiveID}
            changeTitleFormatLists={changeTitleFormatLists}
            activeID={activeID}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
