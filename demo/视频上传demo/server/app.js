const fs = require("fs");
// var express = require("express");
// const cors = require("koa2-cors");
// var bodyParser = require("body-parser");
var path = require("path");

// var multer = require("multer");

// //上传的文件保存在 upload
// const storage = multer.diskStorage({
//   // destination  :设置文件的上传路径
//   destination:function(req, file, cb) {

//       //file 是上传的文件信息 比如 文件类型，文件名字，文件大小  。。。。。

//       //req.body 除了文件之外的表单信息 比如 id name email
      
//       //按找id进行分文件夹存储
//       //如果不存在  就创建一个文件夹
//       if(! fs.existsSync("public/img/"+req.body.u_id)){
//         fs.mkdirSync("public/img/"+req.body.u_id,(err)=>{})
//       }
//       //如果存在  就进行路径的按需设置，
//       if(fs.existsSync("public/img/"+req.body.u_id)){
//         cb(null,"public/img/"+req.body.u_id)
//       }
//   },
//   //filename 设置文件的名字及后缀  后缀： 文件类型 比如 ：.png .jpg .mp4 ......
//   filename:function(req, file, cb) {
//     let type = file.originalname.match(/(.[a-z]{3,5})$/i)[0]

//     // cb :回调函数 调用之后会把会把文件存储到 destination 设置的路径中
//     //但是需要自己定义名字及后缀    后缀： 文件类型 比如 ：.png .jpg .mp4 ......
//     //null ：在存储之前调用，如果没有就开始存储文件
//     cb(null, new Date().getTime()+type);
//   },
// });

// //传入storage 除了这个参数我们还可以传入dest等参数
// const upload = multer({ storage });

// let app = express();

// // app.use(cors())
// app.all("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   next();
// });
// app.use(express.static("public"));

// app.listen(2000, (_) => {
//   console.log("2000端口");
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/html/html.html");
// });

// app.post("/uploadVideo", upload.any("avatar"), (req, res,next) => {
//   //处理返回路径
//   res.send("127.0.0.1:2000/"+req.files[0].path.replace('public',''))
// });

// if(!fs.existsSync('./mydir')){
//   fs.mkdirSync('mydir');
//   fs.copyFileSync('./stu.txt','./mydir/stu.txt')
//   fs.appendFileSync('./mydir/stu.txt','来了来了')
// }

// const fs = require('fs');
// let stream = fs.createReadStream('./视频照片.zip');
//添加事件监听:监听是否有数据流入
//on （事件名称，回调函数）
//data 固定， 表示 一旦有数据流入自动通过 data事件获取
// let count = 0
// stream.on('data',(chunk)=>{

//     count++
// })
// stream.on('end',(chunk)=>{
//   console.log('结束');
//   console.log(count);
// })
const http = require('http');

const { charsets } = require("mime");
const app = http.createServer();
app.listen('3389')
app.on('request',(req,res)=>{
  res.writeHeader(200,{"Content-Type":"text/html;charset=utf-8"})
  if(req.url=='/woyao'){
    fs.readFile('./public/html/html.html',(err,data)=>{
      res.end(data)
    })
  }
})
