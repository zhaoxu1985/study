import React, {
  Component
} from "react";
import reactDom from "react-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import action from "./action/index";
import store from "./store/index";

class Index extends Component {
  updateStore = () => {
    store.dispatch(
      action.sendAction({
        a: 1,
        value: "发的",
      })
    );
  };
  render() {
    return ( <
      div >
      <
      button onClick = {
        () => this.updateStore()
      } > 更改store中的state < /button>
      更新后的数据： {
        store.getState().value
      } {
        " "
      } <
      /div>
    );
  }
  componentDidMount() {
    //注册监听，接收store更新的新值
    // store.subscribe 接受一个回调函数
    store.subscribe(() => {
      console.log("接收到更新", store.getState());
      this.setState({});
    });
  }
}

reactDom.render( < Index > < /Index>, document.getElementById("root"));