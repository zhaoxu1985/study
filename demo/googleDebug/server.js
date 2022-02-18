const mysql = require("mysql");
const express = require("express");
let server= express();
const path = require('path')
const body = require('body-parser');



server.use( body.urlencoded({extended: false}) )
server.use(express.static('public'))
server.listen(8000,()=>{
    // console.log('打开8000');
})

    
server.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/width放大demo.html')
})