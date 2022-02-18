import React,{Component} from 'react'
// import {axios} from '../utils/axios.js';
import axios from 'axios'
import Childrens from './props'
export default class Props extends Component{
    constructor(props){
        super(props)
        this.state={
            uname:'111',
            list:[],
            text:0
        }
    }
    //父组件声明回调函数，接收子组件传参
    eventHub=(data)=>{
        // 接收子组件调用并传过来的参数
        this.setState({
            text:this.state.text+data
        })
    }
    render(h) {
        return <div>
            <div>
              我是父组件：{this.state.text}
            </div>
            <hr/>
            <div >
                <Childrens hub={this.eventHub}> </Childrens>
            </div>
        </div>
    }

}