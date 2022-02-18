import React from 'react'

export default function ClassHello(props) {

    return <div style={{width:'100%',height:'80px',background:'#ffac3a',margin:'10px 0px',border:'1px dashed #ccc',boxShadow:'0px 0px 10px #ccc'}}>
        <div>评论人:{props.uname}</div>
        <p>评论内容：{props.content}</p>
    </div>
    
}

