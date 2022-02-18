import React, { Component, createRef } from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import action from "./action/index";
import store from "./store/index";
import List from "./ProviderStore";
import UseStateCall from "./useState";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aaaa: 1111,
      ref: createRef(),
    };
  }
  updateStore = () => {
    console.log(this.state.ref.current.click());
    store.dispatch({
      type: "add",
      value: 1,
    });
  };
  updatSubStore() {
    store.dispatch({
      type: "sub",
      value: 2,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <button onClick={() => this.updateStore()}>
          更改store中的state count（ + 1）
        </button>
        <button onClick={() => this.updatSubStore()}>
          更改store中的state count（ - 1）
        </button>
        更新后的数据： {store.getState().count.count} <br />
        <List ref={this.state.ref} store={store} />
        <hr />
        <UseStateCall />
      </Provider>
    );
  }
  componentDidMount() {
    //注册监听，接收store更新的新值
    // store.subscribe 接受一个回调函数
    store.subscribe(() => {
      this.setState({});
    });
  }
}

reactDom.render(<Index></Index>, document.getElementById("root"));
