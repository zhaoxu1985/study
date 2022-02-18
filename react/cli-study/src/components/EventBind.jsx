import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
export default class EventBind extends React.Component{
    constructor(){
        super()
        this.state = {
            num:1,
        }
    }
    fun=( a )=>{
        this.setState({
            num:this.state.num+1+a
        })
        console.log(a);
        console.log(this.state.num);
    }
    inputChange(e){
        this.setState({
            num :e.target.value
        })
        
    }
    
    render(){
        return <div>
            <div>{this.state.num}</div>
            <hr />
            <button onClick={ ()=>this.fun('🙄') } className="btn btn-primary"> 点击事件 </button>
            <hr />
            <input type="text" value={this.setState.sum} onChange={ (e)=> this.inputChange(e) } />
        </div>
    }
}