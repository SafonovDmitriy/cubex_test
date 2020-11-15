import { useState } from "react";
import "./App.scss";

function App() {
  let [state, setState] = useState([]);

  const addPanel = (item, idx, saveObj, list) => {
    const save = (addText) => {
      item.addPanel = addText;
      setState([...state]);
    };
    const del = () => {
      console.log(list, item);
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
    return (
      <ul>
        {list.todoList.map((item, localIdx) => {
          if (item.todoList.length !== 0) {
            return (
              <div key={`listBox-${localIdx}`}>
                <li key={`list-${localIdx}`}>
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
    <div className="container">
      <button
        onClick={() => {
          state.push({
            title: `item${state.length + 1}`,
            todoList: [],
            addPanel: "",
          });
          setState([...state]);
        }}
      >
        Add
      </button>

      {state.map((item, idx) => {
        return (
          <div className="note" key={`note${idx}`}>
            <h1 key={`Title${idx}`}>
              {item.title}

              {/* <button
                key={`buttonDel${idx}`}
                onClick={() => {
                  let localState = state.filter(
                    (item, localIdx) => idx !== localIdx && item
                  );

                  setState(localState);
                }}
              >
                Del
              </button> */}
            </h1>
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
