import { useState } from "react";
import "./App.scss";

function App() {
  const notes = [
    {
      title: "Item0",
      todoList: [
        { title: "item1", todoList: [] },
        {
          title: "item2",
          todoList: [
            { title: "item 2__1", todoList: [] },
            {
              title: "item 2__2",
              todoList: [
                { title: "item 2__2__1", todoList: [] },
                { title: "item 2__2__2", todoList: [] },
                { title: "item 2__2__3", todoList: [] },
                { title: "item 2__2__4", todoList: [] },
              ],
            },
            { title: "item 2__3", todoList: [] },
            { title: "item 2__4", todoList: [] },
          ],
        },
        { title: "item3", todoList: [] },
        { title: "item4", todoList: [] },
      ],
    },
  ];
  let [state, setState] = useState(notes);

  const rec = (list) => {
    const add = (idx) => {
      list.todoList[idx].todoList.push({
        title: `item${list.todoList[idx].todoList.length + 1}`,
        todoList: [],
      });
      setState([...state]);
    };
    const del = (idx) => {
      list.todoList.splice(idx, 1);
      setState([...state]);
    };
    return (
      <ul>
        {list.todoList.map((item, localIdx) => {
          if (item.todoList.length !== 0) {
            return (
              <div key={`listBox-${localIdx}`}>
                <li key={`list-${localIdx}`}>
                  {item.title}
                  <button
                    key={`buttonAddItem-${localIdx}`}
                    onClick={() => add(localIdx)}
                  >
                    Add
                  </button>
                  {item.todoList.length !== 0 && (
                    <button
                      key={`buttonItem-${localIdx}`}
                      onClick={() => del(localIdx)}
                    >
                      Del
                    </button>
                  )}
                </li>
                {rec(item)}
              </div>
            );
          } else {
            return (
              <div key={`listBox-${localIdx}`}>
                <li key={`list-${localIdx}`}>
                  {item.title}{" "}
                  <button onClick={() => add(localIdx)}>Add</button>
                  <button onClick={() => del(localIdx)}>Del</button>
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
      {state.map((item, idx) => {
        return (
          <div className="note" key={`note${idx}`}>
            <h1 key={`Title${idx}`}>
              {item.title}
              <button
                key={`buttonAdd${idx}`}
                onClick={() => {
                  item.todoList.push({
                    title: `item${item.todoList.length + 1}`,
                    todoList: [],
                  });
                  setState([...state]);
                }}
              >
                Add
              </button>
              <button
                key={`buttonDel${idx}`}
                onClick={() => {
                  let localState = state.filter(
                    (item, localIdx) => idx !== localIdx && item
                  );
                  setState(localState);
                }}
              >
                Del
              </button>
            </h1>

            <ul>{rec(item)}</ul>
          </div>
        );
      })}
      <button
        onClick={() => {
          state.push({ title: `item${state.length + 1}`, todoList: [] });
          setState([...state]);
        }}
      >
        Add
      </button>
    </div>
  );
}
export default App;
