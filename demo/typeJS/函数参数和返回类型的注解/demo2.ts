function add({ one, two }: { one: number, two: number }) {
    one == 0 ? one = 2 : one = 0;
    return one + two
}
const babal = add({ one: 0, two: 2 })
// console.log(babal)
let s: {
    one: number,
    two: number
} = {
    one: 1,
    two: 23
};

function addTimeOut(uname: string | number,sudu:number):any{
    let a:number = 1;

    uname=setInterval(function(){return a++},sudu)
    return 

}
console.log(addTimeOut('zx',1000))
// clearInterval(zx)
// zx>10? clearInterval(zx):null;