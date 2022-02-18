import React,{Component} from 'react'
// import {axios} from '../utils/axios.js';
import axios from 'axios'
export default class Props extends Component{
    constructor(props){
        super(props)
        this.state={
            uname:'111',
            list:[],
            text:2
        }
    }
    render(h) {
        return <div>
            <div >
               我是子组件 将要把{this.state.text}传给父
            </div>
            <button onClick={e=>{this.handle()}}> 传送 </button>
        </div>
    }
    handle(){
       this.props.hub(this.state.text)
    }
}