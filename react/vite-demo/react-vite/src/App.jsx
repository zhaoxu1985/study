import { useState, useEffect, useCallback } from "react";
import "./index.css";
let arr = [
  {
    id: 1,
    title: "sheng",
    children: [
      {
        id: 2,
        title: "a1",
        children: [
          {
            id: `2-1`,
            title: "a4",
          },
        ],
      },
      {
        id: 3,
        title: "a3",
      },
    ],
  },
  {
    id: 4,
    title: "sheng",
    children: [
      {
        id: 5,
        title: "a1",
        children: [
          {
            id: `5-1`,
            title: "a4",
          },
        ],
      },
      {
        id: 6,
        title: "a3",
      },
    ],
  },
];
function Tree({ list }) {
  return list.map((item) => {
    return (
      <ul key={item.id}>
        <li
          key={item.id}
          onClick={(e) => {
            console.log(e.target.parentNode, item.id);
          }}
          style={{ position: "relative" }}
        >
          <span>{item.title}</span>
          {item.children ? <span className="rightPointer"> ></span> : null}
        </li>
        {item.children ? <Tree list={item.children}></Tree> : null}
      </ul>
    );
  });
}
function App() {
  return (
    <div className="box">
      <Tree list={arr}></Tree>
    </div>
  );
}

export default App;
