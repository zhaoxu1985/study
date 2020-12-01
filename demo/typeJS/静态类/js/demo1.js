"use strict";
var zx = {
    uname: 'zx',
    age: 1,
    id: 41
};
console.log(zx.age);
var arr = ['zx', 'aa', 'asd'];
var all = function () {
    return 's';
};
//创建一个 静态类
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var uname = new Person();
// const obj:string =new Person();
console.log(uname);
