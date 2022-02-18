//    定义: T  T为函数调用是规定的类型，由调用时规定类型
function a(name) {
    console.log(name);
    return name;
}
// 第一种方法，指定传入的类型
// a('asdfzxcv')
//   第二种方法 可以不用明确声明传递参数的类型，函数自动会 `类型推断` ,
// 自动推断传递的类型
// 问题？
//  length属性有吗？ 传入的是个字符串应该有长度，但是 T 代表任意类型， 没有Length属性
function lengths(str) {
    console.log(str.length);
    return str;
}
lengths(["23", 4, 2, 12]);
