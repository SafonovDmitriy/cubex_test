import { useState } from "react";
import "./App.scss";

function App() {
  let [state, setState] = useState([]);
  let [globalText, setGlobalText] = useState("");
  const addPanel = (item, idx, saveObj, list) => {
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
              item.addPanel && item.todoList.push(saveObj);
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
    const up = (idx) => {
      let test = [];
      test.push({ ...list.todoList[idx] });
      test.push({ ...list.todoList[idx - 1] });
      list.todoList.splice(idx - 1, 2, ...test);

      setState([...state]);
    };
    const down = (idx) => {
      let test = [];
      test.push({ ...list.todoList[idx + 1] });
      test.push({ ...list.todoList[idx] });
      list.todoList.splice(idx, 2, ...test);

      setState([...state]);
    };
    return (
      <ul>
        {list.todoList.map((item, localIdx) => {
          if (item.todoList.length !== 0) {
            return (
              <div key={`listBox-${localIdx}`}>
                <li key={`list-${localIdx}`}>
                  {localIdx !== 0 && (
                    <button onClick={() => up(localIdx)}>Up</button>
                  )}
                  {localIdx !== list.todoList.length - 1 && (
                    <button onClick={() => down(localIdx)}>Down</button>
                  )}
                  {item.title}
                  {addPanel(
                    item,
                    localIdx,
                    {
                      title: item.addPanel,
                      todoList: [],
                      addPanel: "",
                    },
                    list
                  )}
                </li>
                {rec(item)}
              </div>
            );
          } else {
            return (
              <div key={`listBox-${localIdx}`}>
                <li key={`list-${localIdx}`}>
                  {localIdx !== 0 && (
                    <button onClick={() => up(localIdx)}>Up</button>
                  )}
                  {localIdx !== list.todoList.length - 1 && (
                    <button onClick={() => down(localIdx)}>Down</button>
                  )}
                  {item.title}
                  {addPanel(
                    item,
                    localIdx,
                    {
                      title: item.addPanel,
                      todoList: [],
                      addPanel: "",
                    },
                    list
                  )}
                </li>
              </div>
            );
          }
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
            {addPanel(
              item,
              idx,
              {
                title: item.addPanel,
                todoList: [],
                addPanel: "",
              },
              item
            )}
            <ul>{rec(item)}</ul>
          </div>
        );
      })}
    </div>
  );
}
export default App;
