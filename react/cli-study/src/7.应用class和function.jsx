import React from 'react'
import ReactDOM  from 'react-dom'
//如果不做配置，不能省略组件的后缀名
import CmListBox from '@/components/列表渲染父组件'


const div = <div>
    <CmListBox></CmListBox>
</div>
ReactDOM.render(div,document.getElementById('app'))