import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";
import demo from './children'

const Home2 = () => <p>我是home2页面</p>


ReactDOM.render(
  <Router>
      <div className="App">
          我是home页面

          <Link to="/home2"> 去Home2页面 </Link>

          {/* Switch 相当与 Vue 中的 router-view  组件显示区 */}
          <Switch>
            <Route path="/home2" component={Home2}></Route>
          </Switch>
      </div>
  </Router>,
  document.getElementById("root")
);
