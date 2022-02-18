import React,{Component} from 'react'
// import axios from 'axios'

//修改组件名，便于调试
function setDisplayName (WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
//创建高阶组件
export default function withMouse(WrappedComponent){
    //组件提供复用的状态逻辑
    class Mouse extends Component {
         constructor(props){
            super(props)
            this.state={
                x:'',
                y:''
            }
         }
        //监听鼠标坐标
        componentDidMount(){
            window.addEventListener('mousemove',this.mousemoveHandle)
        }
        mousemoveHandle = (e)=>{
            this.setState({
                x:e.clientX,
                y:e.clientY
            })
        }
        render(){
            return <WrappedComponent { ...this.state } { ...this.props }></WrappedComponent>
        }
        componentWillUnmount(){
            window.removeEventListener('mousemove',this.mousemoveHandle)
        }
    }
    //修改组件名称
    Mouse.displayName = `WithMouse${setDisplayName(WrappedComponent)}`
  
    return Mouse
}