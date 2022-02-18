import React from 'react'
import ReactDOM  from 'react-dom'

const arr = ['张三','李四','王五','赵六'];
let filterArr = arr.map((item,i)=>{
    return <h1 key={i}>{item}</h1>
})

const div = <div>
    {filterArr}
</div>
// 或者-------------------------------------
const arr2 = ['张三2','李四2','王五2','赵六2'];
const div2 = <div>
    {arr2.map((item,i)=><h1 className="h" key={i}>{item}</h1>)}
</div>

ReactDOM.render(div2,document.getElementById('app'))