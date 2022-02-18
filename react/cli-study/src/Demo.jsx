import React, { Component } from "react";

export default class Demo extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          id: 1,
          value: "真不错",
        },
        {
          id: 2,
          value: "真不2",
        },
        {
          id: 3,
          data: "哦哦哦",
        },
      ],
      inputValue: "",
    };
  }
  inputChange(val) {
    this.setState({
      inputValue: val.target.value,
    });
  }
  shouldComponentUpdate(a, b, c) {
    console.log(a, b, c);
    return true;
  }
  render() {
    return (
      <div>
        <input
          onChange={(val) => this.inputChange(val)}
          value={this.state.inputValue}
          type="text"
        />
      </div>
    );
  }
}
