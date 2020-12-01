const body = require('body-parser');
const express = require('express');
const server = express();
const mysql = require('mysql');
const pool = require('./pool/mypool')
const Router = require('./Router/myRouter');


server.use(body.urlencoded({
    extended: false
}))

server.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); 
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
})

server.use(body.json())

server.use(express.static('public'));
server.listen(8001,function () {
    console.log("打开浏览器");
})


server.get('/', function (req, res) {
    res.sendFile(__dirname+'/public/html/axios.html')
})

server.post('/aaa', function (req, res) {
    console.log(req.body);
    res.send('a')
})

server.use('/home/login', (req, res, next) => {

    next()
})
server.use('/home', Router)