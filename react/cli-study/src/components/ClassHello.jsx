import React from 'react'

export default class ClassHello extends React.Component{
    //函数构造器，每一个类中都有一个构造器，

    //在 class 声明的 组件当中， 想使用外界传入的 props 参数， 不需要接收
    constructor(){
        super()
        //state 中的数据都是 可读可写的 
        this.state = { // 这个 this.state 就相当于 vue 中 data(){ return { } } 
            msg:'我是中state组件数据'
        }
    }
    //直接通过 this.props.[属性名] 即可
    render(){
        return <div>
            我是 Hello 组件  姓名:{this.props.name} 年龄:{this.props.age}
        </div>
    }
    
}

