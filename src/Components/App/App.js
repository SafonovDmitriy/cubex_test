import React, { useState } from "react";
import "./App.scss";

function App() {
  let [state, setState] = useState([]);
  let [globalText, setGlobalText] = useState("");
  const addPanel = (item, idx, list) => {
    const save = (addText) => {
      item.addPanel = addText;
      setState([...state]);
    };
    const del = () => {
      if (state[idx] === list && list === item) {
        setState(state.filter((item, localIdx) => idx !== localIdx && item));
      } else {
        list.todoList = list.todoList.filter(
          (item, localIdx) => idx !== localIdx && item
        );
        setState([...state]);
      }
    };

    return (
      <div className="addTitle">
        <input
          value={item.addPanel}
          type="text"
          placeholder="Title"
          onChange={(e) => save(e.currentTarget.value)}
        />
        {
          <button
            key={`buttonAdd${idx}`}
            onClick={() => {
              item.addPanel &&
                item.todoList.push({
                  title: item.addPanel,
                  todoList: [],
                  addPanel: "",
                });
              save("");
              setState([...state]);
            }}
          >
            Add in Obj
          </button>
        }
        {
          <button key={`buttonItem-${idx}`} onClick={() => del()}>
            Del Obj
          </button>
        }
      </div>
    );
  };
  const rec = (list) => {
    const moveItem = (idx) => {
      list.todoList.splice(idx, 0, ...list.todoList.splice(idx, 2).reverse());
      setState([...state]);
    };
    const moveButton = (localIdx) => {
      return (
        <>
          {localIdx !== 0 && (
            <button onClick={() => moveItem(localIdx - 1)}>Up</button>
          )}
          {localIdx !== list.todoList.length - 1 && (
            <button onClick={() => moveItem(localIdx)}>Down</button>
          )}
        </>
      );
    };
    return (
      <ul>
        {list.todoList.map((item, localIdx) => {
          return (
            <div key={`listBox-${localIdx}`}>
              <li key={`list-${localIdx}`}>
                {item.title}
                {moveButton(localIdx)}
                {addPanel(item, localIdx, list)}
                {item.todoList.length !== 0 && rec(item)}
              </li>
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="container" key="container">
      <input
        type="text"
        placeholder="Global Title"
        value={globalText}
        onChange={(e) => setGlobalText(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          globalText &&
            state.push({
              title: globalText,
              todoList: [],
              addPanel: "",
            });
          setState([...state]);
          setGlobalText("");
        }}
      >
        Add
      </button>
      {state.map((item, idx) => {
        return (
          <div className="note" key={`note${idx}`}>
            <h1 key={`Title${idx}`}>{item.title}</h1>
            {addPanel(item, idx, item)}
            <ul>{rec(item)}</ul>
          </div>
        );
      })}
    </div>
  );
}
export default App;
