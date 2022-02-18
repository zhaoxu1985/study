import { useState, useEffect } from "react";

export default function App() {
  console.log("app render ->", performance.now());
  const [a, setA] = useState("A");
  const [b, setB] = useState("B");
  const [c, setC] = useState("C");
  function changeState() {
    setTimeout(() => {
      console.log("begin");
      setA("AA");
      console.log("a End");
      setB("BB");
      console.log("b End");
      setC("CC");
      console.log("c End");
    }, 1000);
  }
  useEffect(() => {
    console.log("render end update");
  });
  return (
    <div>
      <div>
        a:{a} ,b:{b} ,c:{c}
      </div>
      <button
        onClick={(e) => {
          changeState();
        }}
      >
        更新值
      </button>
    </div>
  );
}
