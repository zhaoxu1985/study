const fs = require("fs");

function readf(fileName) {
  return new Promise((success, errs) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) errs(err);
      else {
        success(data);
        // errs("sss");
      }
    });
  });
}
let read = new readf("1.txt")
  .then(
    (data) => {
      console.log(data);
      return readf("2.txt");
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    }
  );
