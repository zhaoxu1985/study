import React from 'react'
import ReactDOM  from 'react-dom'



// 什么时候使用 {} 
const num = 10;
const str = '你好React 啊';
const bool = false;
const div = <div>
    你好啊{num}
    <hr></hr>
    <br />
    <button>你好 React</button>
    <br />
    {str}
    <br />
    {bool.toString()}
    <br />

    {bool==true?'条件为真' : '条件为假'}
</div>

ReactDOM.render(div,document.getElementById('app'))