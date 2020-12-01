const express = require('express');
const bodyParser = require('body-parser');
let server = express();
server.use( bodyParser.urlencoded({extended: true}) )
app.use(bodyParser.json());
server.listen(8000,()=>{
})
server.get('/reg',(req,res)=>{
console.log(req.body)
})