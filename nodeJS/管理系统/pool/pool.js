const mysql = require("mysql");
let pool = mysql.createPool({
  host: "127.0.0.1", //本地地址
  user: "root", //数据库名字
  password: "root", //密码
  database: "web194", //连接数据库
  connectionLimit:'1000'
});

module.exports=pool;
