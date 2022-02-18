import React from 'react'
import ReactDOM  from 'react-dom'

// 第一种创建组件的方式 创建一个构造函数 并return相应的元素 为空需要

//传递参数到组件中,形参使用props接收（不固定。但是props更有语义化）
//在使用组件的属性中，传递参数
//如： <my-div [属性名]={id:1}></my-div>
//!  !!注意!!! : 组件中传入的数据， 是只读的(read-only) 不可变更，不可复制 否则报错
function hello(props){
    console.log(props.name);
    return <div>
        我是组件12
        <hr />
        {props.name.name}
        {props.name.age}
        {props.name.sex}
    </div>
}
const obj = {
    name:'王五',
    age:2,
    sex:'雄'
}
const div = <div>
    <hello name={obj}></hello>
</div>
ReactDOM.render(div,document.getElementById('app'))