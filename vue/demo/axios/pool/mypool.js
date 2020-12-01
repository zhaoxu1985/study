const mysql = require('mysql');
let pool= mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'user',
    connectionLimit:1000
})
module.exports=pool;