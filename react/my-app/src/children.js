import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component{
    constructor(props){
        super(props)
        this.setState={
            x:111,
            y:222
        }
    }
    componentDidMount=e=>{
        console.log(this.props)
    }
    render(){
        return <div>
            你好 {this.props.children}
        </div>
    }
}
class Hello2 extends React.Component{
    constructor(props){
        super(props)
        this.setState={
            x:111,
            y:222
        }
    }
    componentDidMount=e=>{
        console.log(this.props)
    }
    render(){
        return <div>
            你好我是Hello2
        </div>
    }
}
ReactDOM.render(
    <div>
      <Hello { ...{data:'1'}}>
          <Hello2/>
      </Hello>
    </div>,
    document.getElementById("root")
  );
  