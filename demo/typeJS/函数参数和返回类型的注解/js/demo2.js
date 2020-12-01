"use strict";
function add(_a) {
    var one = _a.one, two = _a.two;
    one == 0 ? one = 2 : one = 0;
    return one + two;
}
var babal = add({ one: 0, two: 2 });
// console.log(babal)
var s = {
    one: 1,
    two: 23
};
function addTimeOut(uname, sudu,yuansu) {
   setInterval(function(){
        
   },sudu)
}
let zx=addTimeOut('zx', 1000);
console.log(zx)
// clearInterval(zx)
// zx>10? clearInterval(zx):null;
