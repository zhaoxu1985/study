const mysql = require("mysql");
const express = require("express");
let server= express();
const path = require('path')
const body = require('body-parser');
let myRouter = require('./routers/myRouter.js');
let pool= require('./pool/pool');

server.use( body.urlencoded({extended: false}) )
server.use(express.static('public'))
server.listen(8000,()=>{
    // console.log('打开8000');
})

    
server.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/user/login_signUp.html')
})
server.get('/_login',(req,res)=>{
    res.sendFile(__dirname+'/public/user/signIn.html')
})
server.get('/_signUp',(req,res)=>{
    res.sendFile(__dirname+'/public/user/signUp.html')
})
server.use('/user/login',(req,res,next)=>{
    if(req.body.uname =='' || req.body.upwd=='') {
        res.send('0');
    } else {
        next();
    }
})
server.use('/user/reg',(req,res,next)=>{
    if(req.body.uname =='' || req.body.upwd=='') {
        res.send('0');
    } else {
        console.log('准备进入');
        next();
    }
})
server.use('/user',myRouter)
