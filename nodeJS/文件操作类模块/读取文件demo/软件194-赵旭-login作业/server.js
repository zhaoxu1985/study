const mysql = require("mysql");
const express = require("express");
const http = require("http");
let querystring = require("querystring");
let url = require("url");
const fs = require("fs");
const path = require("path");
const pool = require("../user/pool/pool");

const server = express();

//创建数据库配置
var toolsAre = mysql.createConnection({
  host: "127.0.0.1", //本地地址
  user: "root", //数据库名字
  password: "root", //密码
  database: "student", //连接数据库
});

toolsAre.connect(); //连接数据库

server.use(express.static(path.join(__dirname, "public")));
server.listen("8000", () => {
  console.log("请访问8000");
});

server.get("/", (request, response) => {
  // response.sendFile(__dirname + "/login_signIn.html");
});
server.post("/login", (request, response) => {
  request.on("data", function (req) {
    let obj = querystring.parse(req.toString());
    toolsAre.query(
      `SELECT * FROM STUINFO WHERE uname='${obj.uname}' && upwd=${obj.upwd}`,
      (err, data) => {
        if (data.length >= 1) {
          response.sendFile(__dirname + "/success.html");
        } else {
          response.send("登陆失败呢");
          console.log("登录失败呢");
        }
      }
    );
  });
});
server.post("/_signIn", (request, response) => {
  response.sendFile(__dirname + "/signIn.html");
});

server.post("/_login", (request, response) => {
  response.sendFile(__dirname + "/login.html");
});

server.post("/signIn", (req, res) => {
    //查重---------------------------------------------------------------------------
    
    pool.query(
      `SELECT * FROM STUINFO WHERE uname='${obj.uname}'`,
      (err, data) => {
        if (data.length >= 1) {
          response.send("no");
        }
        //------查重-------------------------------------------------------------------
        else {
          pool.query(
          
            `INSERT INTO stuinfo(uname,upwd)values('${obj.uname}','${obj.upwd}')`,
            (err, data) => {
              if (data.affectedRows > 0) {
                response.send("yes");
              } else {
                response.send("no");
              }
            }
          );
        }
      }
    );
 
});
