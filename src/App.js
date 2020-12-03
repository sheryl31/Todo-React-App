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
  const [currentList, setCurrentList] = useState(null);

  const saveLocalTodos = () => {
    localStorage.setItem("formatLists", JSON.stringify(formatLists));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("formatLists") === null) {
      localStorage.setItem("formatLists", JSON.stringify([]));
    } else {
      let localformatLists = JSON.parse(localStorage.getItem("formatLists"));
      setFormatLists(localformatLists);
      if (localformatLists.length) setActiveID(localformatLists[0].id);
    }
  };
  const togglePop = () => {
    setSeen(!seen);
    setTodos([]);
    setActiveID(null);
    setTodoContainerToggle(!todoContainerToggle);
  };

  const deleteEmpty = () => {
    setFormatLists(formatLists.filter((el) => el.todos.length > 0));
  };

  const toggleEdit = () => {
    if (currentList && currentList.todos.length > 0) {
      setEdit(!edit);
      setTodoContainerToggle(!todoContainerToggle);
    }
  };

  const editFormatList = (id) => {
    let formatList = formatLists.find((item) => item.id === id);
    if (formatList && formatList.todos.length > 0) {
      setCurrentList(formatList);
      setTodos(formatList.todos);
    }
    toggleEdit();
  };

  const updateFormatLists = () => {
    if (!todos && !todoContainerToggle) return;

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

  const changeTitleFormatLists = useCallback((cur_formatTodo, text) => {
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
    if (!activeID) return;
    let formatList = formatLists.find((item) => item.id === activeID);
    if (formatList && formatList.todos.length > 0) {
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
          key={"popup-1"}
          togglePop={togglePop}
          todos={todos}
          setTodos={setTodos}
          formatTodo={formatLists[formatLists.length - 1]}
          todoContainerToggle={todoContainerToggle}
          deleteEmpty={deleteEmpty}
          setActiveID={setActiveID}
          editFormatList={editFormatList}
          changeTitleFormatLists={changeTitleFormatLists}
        />
      ) : null}

      <div>
        <div
          className={
            todoContainerToggle ? `hide-window` : `format-list-container`
          }
        >
          {!seen
            ? formatLists.map((item, index) => (
                <div className="formatLists-todo-container" key={index}>
                  <TodoList
                    key={item.id}
                    todos={item.todos}
                    setTodos={setTodos}
                    todoContainerToggle={todoContainerToggle}
                    setActiveID={setActiveID}
                    editFormatList={editFormatList}
                    formatTodo={item}
                    changeTitleFormatLists={changeTitleFormatLists}
                  />
                </div>
              ))
            : null}
        </div>
        {edit ? (
          <Popup
            key={"popup-2"}
            togglePop={toggleEdit}
            todos={currentList.todos}
            setTodos={setTodos}
            formatTodo={currentList}
            todoContainerToggle={todoContainerToggle}
            deleteEmpty={deleteEmpty}
            editFormatList={editFormatList}
            setActiveID={setActiveID}
            changeTitleFormatLists={changeTitleFormatLists}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
