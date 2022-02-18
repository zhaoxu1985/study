
//组件中 需要导入 React 包   !!!必须的!!!
import React from 'react'

// 第一种创建组件的方式 创建一个构造函数 并return相应的元素 为空需要

//传递参数到组件中,形参使用props接收（不固定。但是props更有语义化）
//在使用组件的属性中，传递参数
//如： <my-div [属性名]={id:1}></my-div>
//!!!注意!!! : 组件中传入的数据， 是只读的(read-only) 不可变更，不可复制 否则报错
export default function Hello(props){
    console.log(props);
    return <div>
        我是组件12
        <hr />
        姓名:{props.name}
        <hr />
        年龄:{props.age}
        <hr />
        性别:{props.sex}
    </div>
}