import React from 'react'
import ClassHello from '@/components/评论列表渲染'

export default class CmListBox extends React.Component{
    constructor(){
        super()
        this.state = { 
            msgArr:[
                {
                    id:1,
                    uname:'张三',
                    content:'喜喜呃阿斯蒂芬撒旦'
                },
                {
                    id:2,
                    uname:'张四',
                    content:'喜喜呃阿斯蒂芬撒旦'
                },
                {
                    id:3,
                    uname:'张五',
                    content:'喜喜呃阿斯蒂芬撒旦'
                },
                {
                    id:4,
                    uname:'张六',
                    content:'喜喜呃阿斯蒂芬撒旦'
                },
                {
                    id:5,
                    uname:'张七',
                    content:'喜喜呃阿斯蒂芬撒旦'
                }
            ]
        }
    }
    render(){
        return <div>
            <h1>评论列表</h1>
            <div>
                {this.state.msgArr.map((item)=> <ClassHello {...item} key={item.id}></ClassHello> )}
            </div> 
        </div>
    }
}