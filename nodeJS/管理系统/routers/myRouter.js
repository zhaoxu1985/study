let express = require("express");
const path = require("path");
let body = require("body-parser");
const querystring = require("querystring");
let pool = require("../pool/pool");
let Router = express.Router();
// Router.use(body.json())
Router.post("/login", (req, res) => {
  // console.log("过来了");
  pool.query(`SELECT * FROM teacher where tname="${req.body.uname}"`, function (
    err,
    data
  ) {
    if (data.length >= 1) {
      if (data[0].tpwd == req.body.upwd) {
        res.send("1");
      } else if (data[0].tpwd !== req.body.upwd) {
        console.log("密码不对");
        res.send("2");
      }
    } else {
      res.send("3");
    }
  });
});

Router.post("/reg", (req, res) => {
  //查重---------------------------------------------------------------------------\

    pool.query(
      `SELECT * FROM teacher WHERE tname='${req.body.uname}'`,
      (err, datas) => {
        console.log(datas);
        if (datas.length >=1){
          res.send("2");
        }
        //------查重-------------------------------------------------------------------
        else {
          pool.query(
            `INSERT INTO teacher(tname,tpwd)values('${req.body.uname}','${req.body.upwd}')`,
            (err, data) => {
              if (data.affectedRows > 0) {
                res.send("1");
              } else {
                res.send("2");
              }
            }
          );
        }
      

  })
  
});
Router.get("/home", (req, res) => {
  pool.query("select * from student", (err, data) => {
    res.send(data);
  });
});


Router.post("/update", (req, res) => {
    let upd= req.body;
    pool.getConnection((err, conn) => {
      pool.query(
        `update student set sname='${upd.sname}',ssex='${upd.ssex}',sage='${upd.sage}',sbirthday='${upd.sbirthday}',shobby='${upd.shobby}',sphone='${upd.sphone}',sshow='${upd.sshow}' where sid='${upd.psid}'`,
        (err, data) => {
          if (err) throw err;
          if (data.affectedRows == 1) {
            console.log('成功');
            res.send("updateOk");
          }
        }
      );
      conn.release();
    });
  });


Router.post("/delete", (req, res) => {
  req.on("data", (data) => {
    let uname = querystring.parse(data.toString());
      console.log(uname);
    pool.query(
      `delete from student where sid='${uname.sid}'`,
      (err, result) => {
        console.log(result);
        if (result.affectedRows >= 1) {
          res.send("deleteYes");
        } else {
          res.send("deleteNo");
        }
      }
    );
  });
});
Router.post("/Newdata", (req, res) => {
  req.on('data',(data)=>{
    let mydata = querystring.parse(data.toString())
    console.log(mydata);
    pool.query(
      `SELECT * FROM student where sname='${mydata.uname}'`,
      (err, datas) => {
        console.log(datas);
        if (datas.length >= 1) {
          res.send("2");
        }
        //------查重-------------------------------------------------------------------
        else {
          pool.query(
            `INSERT INTO student(sname,ssex,spic)values('${mydata.uname}','${mydata.upwd}','null')`,
            (err, data) => {
              console.log(data);
              if (data.affectedRows > 0) {
                res.send("1");
              } else {
                res.send("2");
              }
            }
          );
        }
      }
    );
  })
});
module.exports = Router;
