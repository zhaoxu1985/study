import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import store from "./store/index";
import { Provider } from "react-redux";

function Hello(props) {
  const [count, setCount] = useState(20);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // console.log(props);
    console.log("组件更新了");
    // 使用浏览器的 API 更新页面标题
    document.title = `You count ${count} times`;
  }, [count]); //数组中定义 ，哪些state数据变化 会触发生命周期，

  return (
    <div>
      count: {count} <br />
      <button onClick={() => setCount(count + 1)}> count + 1 </button> <br />
      <button onClick={() => setCount(count - 1)}> count - 1 </button>{" "}
    </div>
  );
}

ReactDom.render(
  <div
    style={{
      textAlign: "center",
    }}
  >
    <Provider store={store}>
      <Hello
        name={{
          a: 1,
        }}
      >
        <div id="aaa"> is Children </div>{" "}
      </Hello>{" "}
    </Provider>{" "}
  </div>,
  document.getElementById("root")
);
