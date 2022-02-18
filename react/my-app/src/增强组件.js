import React from "react";
import ReactDOM from "react-dom";
import withMouse from "./components/增强render-props";


function Mouse(props) {
    console.log('mouse:',props)
  return (
    <div>
      我是增强后的组件 x:{props.x} y:{props.y}
    </div>
  );
}
function Mouse2(props) {
  return (
    <div>
      我是增强后的组件2 x:{props.x} y:{props.y}
    </div>
  );
}
const EnhanceMouse = withMouse(Mouse)
const EnhanceMouse2 = withMouse(Mouse2)
ReactDOM.render(
  <div>
    <EnhanceMouse a='1' />
    <EnhanceMouse2 />
  </div>,
  document.getElementById("root")
);
