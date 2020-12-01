function reuse() { 
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
 }