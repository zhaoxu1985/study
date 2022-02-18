import React from 'react'
import ReactDOM  from 'react-dom'
//如果不做配置，不能省略组件的后缀名
import Hello from '@/components/Hello'

const obj = {
    name:'王五',
    age:2,
    sex:'雄'
}
const div = <div>
    <Hello {...obj}></Hello>
</div>
ReactDOM.render(div,document.getElementById('app'))