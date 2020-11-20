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
          className="addTitle__input"
          value={item.addPanel}
          type="text"
          placeholder="Title"
          onChange={(e) => save(e.currentTarget.value)}
        />
        {
          <button
            className="addTitle__add"
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
            +
          </button>
        }
        {
          <button className="addTitle__del" onClick={() => del()}>
            {" "}
            &#10060;
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
        <div className="moveButton">
          {localIdx !== 0 && (
            <button className="up" onClick={() => moveItem(localIdx - 1)}>
              &#9650;
            </button>
          )}
          {localIdx !== list.todoList.length - 1 && (
            <button className="down" onClick={() => moveItem(localIdx)}>
              &#9660;
            </button>
          )}
        </div>
      );
    };
    return (
      <ul>
        {list.todoList.map((item, localIdx) => {
          return (
            <li key={`listBox-${localIdx}`}>
              {moveButton(localIdx)}
              <span>{item.title}</span>

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
      <div className="container__global">
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
          +
        </button>
      </div>

      <div className="container__content">
        {state.map((item, idx) => {
          return (
            <div className="note" key={`note${idx}`}>
              {addPanel(item, idx, item)}
              <h1 className="note__title">{item.title}</h1>

              <ul className="note__ul">{rec(item)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
