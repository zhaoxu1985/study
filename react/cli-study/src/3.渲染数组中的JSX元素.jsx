import React from 'react'
import ReactDOM  from 'react-dom'

const num = [
    <div>hello</div>,
    <div>world</div>
];

const div = <div>
    {num}
</div>

ReactDOM.render(div,document.getElementById('app'))