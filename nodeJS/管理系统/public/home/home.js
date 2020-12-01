var request = new XMLHttpRequest();
let tbody = document.getElementById("tbody");
let searchBnt = document.getElementById('searchBtn');
let search = document.getElementById('search'); {
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
      let arr = JSON.parse(request.responseText);

      new Pagination("#pagi", {
        pagesize: 10,
        total: arr.length,
        change(n) {


          searchBtn.onclick = function () {
            if (search.value.length == 0) {
              let str = "";
              for (let i = 0; i < bindArr.length; i++) {
                // console.log(arr);
                str += ` 
                <tr>
                  <td>${bindArr[i].sid}</td>
                  <td>${bindArr[i].sname}</td>
                  <td>${bindArr[i].ssex}</td>
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
            } else {
              // console.log(this);
              let newArr = arr.filter(function (value) {

                if (
                  value.sid == search.value||value.sname==search.value
                ) {
                  return value
                }
              
              })

              console.log(newArr);

              const bindArr = newArr.slice((n - 1) * 10, n * 10);

              let str = "";
              for (let i = 0; i < bindArr.length; i++) {
                // console.log(arr);
                str += ` 
                <tr>
                  <td>${bindArr[i].sid}</td>
                  <td>${bindArr[i].sname}</td>
                  <td>${bindArr[i].ssex}</td>
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
            }
               let btnEdit = document.querySelectorAll("#btnEdit");
          let btnDelete = document.querySelectorAll("#btnDelete");
          let save = document.getElementById("save");
          let btnLook = document.querySelectorAll("#btnLook");
          let exit = document.getElementById("exit");
          let popUp = document.getElementById("popUp");
          let popUp_center = document.getElementById("popUp_center");

          
          }
          const bindArr = arr.slice((n - 1) * 10, n * 10);
          console.log(bindArr);
          let str = "";
          for (let i = 0; i < bindArr.length; i++) {
            // console.log(arr);
            str += ` 
            <tr>
              <td>${bindArr[i].sid}</td>
              <td>${bindArr[i].sname}</td>
              <td>${bindArr[i].ssex}</td>
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
          // let btnEdit = document.querySelectorAll("#btnEdit");
          // let btnDelete = document.querySelectorAll("#btnDelete");
          // let save = document.getElementById("save");
          // let btnLook = document.querySelectorAll("#btnLook");
          // let exit = document.getElementById("exit");
          // let popUp = document.getElementById("popUp");
          // let popUp_center = document.getElementById("popUp_center");
          for (let i = 0; i < tbody.children.length; i++) { 
            console.log(tbody);
            btnLook[i].onclick = function () {
              
              sessionStorage.setItem("key", JSON.stringify(bindArr[i]));
              window.location = "../dataTable/index.html";
            };

            btnEdit[i].onclick = function () {
              console.log(tbody);
              //  console.log(btnEdit.parentNode);
              let mythis = this.parentNode.parentNode;
              console.log(mythis);
              popUp.style.display = "block";
              popUp.style.display = "flex";

              popUp.style.width = window.innerWidth - 300 + "px";
              popUp.style.height = window.innerHeight + "px";
              window.addEventListener("resize", function () {
                popUp.style.width = window.innerWidth - 300 + "px";
                popUp.style.height = window.innerHeight + "px";
              });
              popUp_center.children[0].children[1].placeholder = `${bindArr[i].sname}`;
              popUp_center.children[1].children[1].placeholder = `${bindArr[i].ssex}`;
              popUp_center.children[2].children[1].placeholder = `${bindArr[i].sage}`;
              popUp_center.children[3].children[1].placeholder = `${bindArr[i].sbirthday}`;
              popUp_center.children[4].children[1].placeholder = `${bindArr[i].shobby}`;
              popUp_center.children[5].children[1].placeholder = `${bindArr[i].sphone}`;
              popUp_center.children[6].children[1].placeholder = `${bindArr[i].sshow}`;

              console.log(bindArr[i]);
              let myarr = [];
              myarr.push(bindArr[i]);
              console.log(myarr[0].sid);

              save.onclick = function () {
                let popUp_center_value = {
                  sname: popUp_center.children[0].children[1].value,
                  ssex: popUp_center.children[1].children[1].value,
                  sage: popUp_center.children[2].children[1].value,
                  sbirthday: popUp_center.children[3].children[1].value,
                  shobby: popUp_center.children[4].children[1].value,
                  sphone: popUp_center.children[5].children[1].value,
                  sshow: popUp_center.children[6].children[1].value,
                };
                if (
                  popUp_center_value.sname == "" ||
                  popUp_center_value.ssex == "" ||
                  popUp_center_value.sage == "" ||
                  popUp_center_value.sphone == ""
                ) {
                  alert("不能为空");
                  return;
                }

                myarr.push(popUp_center_value);
                popUp.style.display = "none";
                let xhr = new XMLHttpRequest();
                xhr.open("post", "/user/update");
                xhr.setRequestHeader(
                  "content-type",
                  "application/x-www-form-urlencoded"
                );
                xhr.send(
                  `psid=${myarr[0].sid}&sname=${myarr[1].sname}&ssex=${myarr[1].ssex}&sage=${myarr[1].sage}&sbirthday=${myarr[1].sbirthday}&shobby=${myarr[1].shobby}&sphone=${myarr[1].sphone}&sshow=${myarr[1].sshow}`
                );
                xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.satus == 304) {
                      if (xhr.responseText == "updateOk") {
                        alert("修改成功");
                        location.reload();
                      } else {
                        alert("修改失败");
                      }
                    }
                  }
                };
              };
              exit.onclick = function () {
                popUp.style.display = "none";
                return;
              };
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
                      location.reload();
                    } else {
                      alert("删除失败");
                    }
                  }
                }
              };
            };
          }
        },
      });
    }
  }
};