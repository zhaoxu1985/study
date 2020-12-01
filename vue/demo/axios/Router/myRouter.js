const mysql = require('mysql');
const express = require('express');
const body = require('body-parser');
const pool = require('../pool/mypool');
const Router = express.Router();
Router.post('/login',(req,res)=>{
    console.log(req.body);
})
Router.post('/aaa',function(req,res){
    console.log(req.body.uname);
    res.send('你好')
})
module.exports=Router;