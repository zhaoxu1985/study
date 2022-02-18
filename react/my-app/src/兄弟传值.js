import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './components/parent.js';
import Content from './components/context1.jsx'

const { Provider , Consumer } = React.createContext()

function Paren () {
  return <div>
    啊啊啊
    <Provider value="9989">
       父组件传值： ‘9989’
       <Child1/>
    </Provider>
  </div>
}
function Child1 () {
  return <div>
      <hr />
      
    y<Consumer>
      { data => <span>child1拿到数据:  { data } </span> }
    </Consumer>
     <Child2 />
     
  </div>
}
function Child2 () {
  return <div>
    <hr />
    <Consumer>
      { data => <span> Child2 拿到数据： { data } </span> }
    </Consumer>
  </div>
}

ReactDOM.render(
  <div>
      <Paren />
  </div>
  ,
  document.getElementById('root')
);

//性能输出
// reportWebVitals(console.log);
