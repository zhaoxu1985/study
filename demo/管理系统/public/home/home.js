var request = new XMLHttpRequest();
let tbody = document.getElementById("tbody");

{
  /* <th>${arr[i].sbirthday}</th>
<th>${arr[i].shobby}</th>
<th>${arr[i].sphone}</th> */
}
//3.创建请求open
request.open("get", "/user/home");
//4.发送请求
request.send(null);
//5.添加onreadystatechange响应函数
request.onreadystatechange = function () {
  if (request.readyState == 4) {
    if (request.status == 200 || request.satus == 304) {
      let str = "";
      let arr = JSON.parse(request.responseText);
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        // console.log(arr);
        str += ` 
        <tr>
          <td>${arr[i].sid}</td>
          <td>${arr[i].sname}</td>
          <td>${arr[i].ssex}</td>
          <td>软件194</td>
          <td style="display:flex;align-items: center;justify-content: center;">
              <button id='btnLook' style="background-color: #0E9C1A;">查看</button>
              <button id='btnEdit' style="background-color: #3F51B5;">修改</button>
              <button id='btnDelete' style="background-color: #FF4081;">删除</button>
              <button id='save' style='display:none;'>保存</button>
          </td>
        </tr>
      `;
      }

      tbody.innerHTML = str;
      let btnEdit = document.querySelectorAll("#btnEdit");
      let btnDelete = document.querySelectorAll("#btnDelete");
      let btnsave = document.querySelectorAll("#save");
      let btnLook = document.querySelectorAll("#btnLook");
      let count = 0;
      for (let i = 0; i < tbody.children.length; i++) {
        btnLook[i].onclick = function () {
            sessionStorage.setItem("key", JSON.stringify(arr[i]));
          window.location = "../dataTable/index.html";
        };
        // console.log(tbody.children[i]);
        btnEdit[i].onclick = function () {
          if (count == 0) {
            let mythis = this.parentNode.parentNode;
            // console.log(mythis);
            btnEdit[i].style.display = "none";
            btnDelete[i].style.display = "none";
            btnLook[i].style.display = "none";
            // mythis.children[2].innerHTML = `<button  id='save${i}'>save</button>`;
            btnsave[i].style.display = "block";
            let myarr = [];
            myarr.push({
              uname: mythis.children[1].innerHTML,
              upwd: mythis.children[2].innerHTML,
            });
            // console.log(myarr);
            mythis.children[1].innerHTML = `<input  type="text" count='zx' value='${mythis.children[1].innerText}'></input><button`;
            mythis.children[2].innerHTML = `<input  type="text" value='${mythis.children[2].innerText}'></input> `;

            btnsave[i].onclick = function () {
              btnsave[i].style.display = "none";
              btnEdit[i].style.display = "inline-block";
              btnDelete[i].style.display = "inline-block";
              btnLook[i].style.display = "inline-block";
              let uname = mythis.children[1].children[0];
              let upwd = mythis.children[2].children[0];
              mythis.children[1].innerHTML = uname.value;
              mythis.children[2].innerHTML = upwd.value;
              myarr.push({ uname: uname.value, upwd: upwd.value });
              console.log(myarr);
              let xhr = new XMLHttpRequest();
              xhr.open("post", "/user/update");
              xhr.send(
                `uname=${myarr[0].uname}&upwd=${myarr[0].upwd}&puname=${myarr[1].uname}&pupwd=${myarr[1].upwd}`
              );
              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                  if (xhr.status == 200 || xhr.satus == 304) {
                    if (xhr.responseText == "updateOk") {
                      alert("修改成功");
                    } else {
                      alert("修改失败");
                    }
                  }
                }
              };
              count = 0;
            };

            count++;
          } else {
          }
        };

        btnDelete[i].onclick = function () {
          let sid = this.parentNode.parentNode.children[0];
          console.log(sid.innerHTML);
          let xhr = new XMLHttpRequest();
          xhr.open("post", "/user/delete");
          xhr.send(`sid=${sid.innerHTML}`);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200 || xhr.satus == 304) {
                if (xhr.responseText == "deleteYes") {
                  alert("删除成功");
                  sid.parentNode.remove();
                } else {
                  alert("删除失败");
                }
              }
            }
          };
        };
      }
    }
  }
};
let btnNew = document.getElementById("btnNew");
btnNew.addEventListener("click", () => {
  let str = document.createElement("tr");
  str.setAttribute("id", "Newtr");
  str.innerHTML = `
          <tr id='Newtr'>
          <td></td>
          <td><input uname='NewUname' type='text'></input></input>
          <td><input uname='NewUpwd'type='text'></td>
          <th>软件194</th>
          <td style="display:flex;align-items: center;justify-content: center;">
              <button id='btnLook' style="background-color: #0E9C1A;">查看</button>
              <button id='btnEdit' style="background-color: #3F51B5;">修改</button>
              <button id='btnDelete' style="background-color: #FF4081;">删除</button>
              <button id='save' >保存</button>
          </td>
        </tr>
      `;

  $(str).insertBefore(tbody.children[0]);

  let save = str.children[4].children[3];
  let uname = str.children[1];
  let upwd = str.children[2];
  console.log(save);
  btnEdit[0].style.display = "none";
  btnDelete[0].style.display = "none";
  btnLook[0].style.display = "none";
  save.onclick = () => {
    if (
      uname.children[0].value.length < 1 ||
      upwd.children[0].value.length < 1
    ) {
      return alert("账号和密码必须为大于6位");
    } else {
      btnEdit[0].style.display = "block";
      btnDelete[0].style.display = "block";
      btnLook[0].style.display = "block";
      save.style.display = "none";
      let xhr = new XMLHttpRequest();
      xhr.open("post", "/user/Newdata");
      console.log(uname.children[0].value);
      console.log(upwd.children[0].value);
      xhr.send(
        `uname=${uname.children[0].value}&upwd=${upwd.children[0].value}`
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200 || xhr.satus == 304) {
            let str = xhr.responseText;
            console.log(str);
            if (str == "2") {
              alert("用户名已存在!");
            } else if (str == "1") {
              alert("增加成功");
              // console.log(str);
              location.reload();
            }
          }
        }
      };
      uname.innerHTML = `<td>${uname.children[0].value}</td>`;
      upwd.innerHTML = `<td>${upwd.children[0].value}</td>`;
    }
  };
});
