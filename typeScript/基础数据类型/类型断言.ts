let someValue: any = "4123";

let strLength: number = (<string>someValue).length;

interface A {
    color?:string,
    size?:number,
}
function b (obj:A):void{
    console.log(obj)
}
b({a:22,b:41,color:'31'})  // 传入A接口未定义的声明，会抛出错误
