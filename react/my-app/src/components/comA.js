import React, {Component } from 'react'
import Com from '../css/Com.css'
//！！！发送方！！！ 使用
import { connect } from 'react-redux';
 
class ComA extends Component {
    addClick=() => {
        this.props.sendAction()
    }
    render() {
        
        return (
            <div>
                <div style ={ Com.a}>
                    1
                </div>
                {/* A 是发送方， 所以要实现 connect 的第二个参数 */}
                <button onClick={ ()=> this.addClick() }>+1</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendAction:() => {
            dispatch( {
                type:'send_add',
                value:1
            } )
        }
    }
}
export default connect(null,mapDispatchToProps)(ComA)
