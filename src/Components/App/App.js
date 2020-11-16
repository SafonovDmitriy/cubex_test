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
        {<button onClick={() => del()}>Del Obj</button>}
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
            <li key={`listBox-${localIdx}`}>
              <p>{item.title}</p>
              {moveButton(localIdx)}
              {addPanel(item, localIdx, list)}
              {item.todoList.length !== 0 && rec(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="container">
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
            <h1>{item.title}</h1>
            {addPanel(item, idx, item)}
            <ul>{rec(item)}</ul>
          </div>
        );
      })}
    </div>
  );
}
export default App;
