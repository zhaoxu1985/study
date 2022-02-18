import React from "react";
import ReactDOM from "react-dom";
//1. 安装并引入 react-router-dom
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//2. 定义一个路由页面
const Home2 = () => <p>我是home2页面</p>
ReactDOM.render(
  <Router>
      <div className="App">
          我是home页面
          {/* 指定路由入口 */}
          <Link to="/home2"> 去Home2页面 </Link>
          {/* 指定路由出出口 */}
          <Route path="/home2" component={Home2}></Route>
      </div>
  </Router>,
  document.getElementById("root")
);
