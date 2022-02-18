// const bar = () => console.log('bar');
// const baz = () => console.log('baz')
// const foo = () => {
//     console.log('foo')
//     setTimeout(bar,0)
//     new Promise((resolve,reject) => {
//         resolve('应该在 baz 之后、bar 之前')
//     }).then(data=>console.log(data))
//     baz()
// }
// foo()
//foo baz ... bar
// console.log('aaa')

// //测试 宏任务 微任务
// Promise.reject().then(()=>{
//     console.log('微任务')
// }).catch(()=>{
//     console.log('错误的微任务')
// })

// setTimeout(()=>{
//     console.log('宏任务')
// },0)
// const a = new Promise((resove,reject)=>{
//     console.log('aaa')
//     resove()
// }).then(()=>{console.log('bbb')})
// console.log('1',a)

// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(() => {
//         console.log('promise')
//     })
//     setTimeout(() => {
//         console.log('2')
//         Promise.resolve().then(() => {
//             {
//                 console.log('promise2')
//             }
//         })
//     })
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
// }, 0)
// console.log('start')

//start timer1 promise timer2 2 promise2

//zzzzzzz
// Promise.resolve().then(() => {
//     console.log('promise1');
//     const timer2 = setTimeout(() => {
//         console.log('timer2')
//     }, 0)
// });
// const timer1 = setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(() => {
//         console.log('promise2')
//     })
// }, 0)
// console.log('start');

// console.log('start')
//  setTimeout(()=>{
//      console.log('timeOut')
//  })
// new Promise((resolve)=>{
//     console.log('promise')
//     resolve()
// }).then(()=>{
//     console.log('theh1')
// }).then(()=>{
//     console.log('then2')
// })
// console.log('end')
//start promise1  timer1 promise2 timer2
//start promise end then1 then2 setTimeout

// Promise.resolve()
// .then(()=>{
//     console.log('aaa')
//     throw new Error('aaa')
// }).then(()=>{
//     console.log('bbb')
// })

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => { //[1]第一个宏任务
//         resolve('success') //[2] 迪奥用
//     }, 1000)
// })                       //[1]第一个微任务
// const promise2 = promise1.then(() => {
//     throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => { //[1]第二个宏任务
//     console.log('promise1', promise1)
//     console.log('promise2', promise2)
// }, 2000)
// promise1 Promise<pedding> promise2 <pedding> promise1 Promise<resolve> promise2 报错？

//outer setinterval setImmediate

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("success");
//         console.log("timer1");
//     }, 1000);
//     console.log("promise1里的内容");
// });
// const promise2 = promise1.then(() => {
//     throw new Error("error!!!");
// });
// console.log("promise1", promise1);
// console.log("promise2", promise2);
// setTimeout(() => {
//     console.log("timer2");
//     console.log("promise1", promise1);
//     console.log("promise2", promise2);
// }, 2000);

/*
    promise1里的内容 
    promise1 Promise<Pedding>
    promise2 Promise<Pedding>
    timer1
    throw err : error!!!
    timer2
    promise1 Promise<resolve: success>
    promise2 Promise<resolve: reject>
*/
//------
/*
        script start 
        async2 end
        Promise
        script end
        async2 end
        promise1
        promise2
        setTimeout
 */
// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('asyn2 end')
// }
// async1()
// setTimeout(()=>{
//     console.log('setTimeOuut')
// },0)
// new Promise((resovle=>{
//     console.log('Promise')
//     resovle()
// }))
// .then(()=>{
//     console.log('promise1')
// })
// .then(()=>{
//     console.log('promise2')
// })
// console.log('script end')

// Promise.resolve().then(() => {
//     console.log('promise1');
//     const timer2 = setTimeout(() => {
//       console.log('timer2')
//     }, 0)
//   });
//   const timer1 = setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(() => {
//       console.log('promise2')
//     })
//   }, 0)
//   console.log('start');

// const promise = new Promise((resolve, reject) => {
//     resolve("success1");
//     reject("error");
//     resolve("success2");
// });
// promise
//     .then(res => {
//         console.log("then: ", res);
//     }).catch(err => {
//         console.log("catch: ", err);
//     })

/*
    
*/

// const promise = new Promise((resolve, reject) => {
//     reject("error");
//     resolve("success2");
//   });
//   promise
//   .then(res => {
//       console.log("then1: ", res);
//     }).then(res => {
//       console.log("then2: ", res);
//     }).catch(err => {                //捕捉之后，返回一个promise
//       console.log("catch: ", err);
//     }).then(res => {                 //这里接收.catch 的返回结果
//       console.log("then3: ", res);
//     })

// Promise.resolve(1)
//     .then(res => {
//         console.log(res); //1
//         return 2; //return promise.resolve(2)
//     })
//     .catch(err => { //不执行
//         return 3;
//     })
//     .then(res => {
//         console.log(res); //2
//     });

/*
    
*/

//   Promise.reject(1)
//   .then(res => {
//     console.log(res);
//     return 2;
//   })
//   .catch(err => {
//     console.log(err);
//     return 3
//   })
//   .then(res => {
//     console.log(res);
//   });

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('timer')
//         resolve('success')
//     }, 1000)
// })
// const start = Date.now();
// promise.then(res => {
//     console.log(res, Date.now() - start) //success  1004毫秒
// })
// promise.then(res => {
//     console.log(res, Date.now() - start) //success  1004毫秒 //可能相同， 可能相差1-2
// })
/*
    
*/
// Promise.resolve().then(() => {
//     return new Error('error!!!')
// }).then(res => {
//     console.log("then: ", res)
// }).catch(err => {
//     console.log("catch: ", err)
// })

// const promise = Promise.resolve().then(() => {
//     return promise;
// })
// promise.catch(console.err)

// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)

// Promise.reject('err!!!')
//     .then((res) => {
//         console.log('success', res)
//     }, (err) => {
//         console.log('error', err)
//     }).catch(err => {
//         console.log('catch', err)
//     })

//如果promise为成功的，.then中的第一个函数被调用，如果.then 中提供了两个函数。第一个函数抛出错误，
//会调用.then中的第2个函数
//如果promise为失败的，不会执行.then 中的第二个回调函数，而去调用,catch方法
// Promise.resolve()
//     .then(function success(res) {
//         throw new Error('error!!!')
//     }, function fail1(err) {
//         console.log('fail1', err)
//     }).catch(function fail2(err) {
//         console.log('fail2', err)
//     })

// Promise.resolve('1')
//     .then(res => {
//         console.log(res)
//     })
//     .finally(() => {
//         console.log('finally')
//     })
// Promise.resolve('2')
//     .finally(() => {
//         console.log('finally2')
//         return '我是finally2返回的值'
//     })
//     .then(res => {
//         console.log('finally2后面的then函数', res)
//     })

// function promise1() {
//     let p = new Promise((resolve) => {
//         console.log('promise1');
//         resolve('1')
//     })
//     return p;
// }

// function promise2() {
//     return new Promise((resolve, reject) => {
//         reject('error')
//     })
// }
// promise1()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally1'))

// promise2()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally2'))

/*
    promise1  1  error   finally1  finally2
*/

// then(res => console.log(res))  <-
// .catch(err => console.log(err))

// promise2()
// .then(res => console.log(res))
// .catch(err => console.log(err))
// .finally(() => console.log('finally2'))

// Promise.resolve(1).then(e=>{
//     console.log(e)
// }).finally(()=>{
//     console.log(`finally`)
// })

// function runAsync(x) {
//     const p = new Promise((resolve) => setTimeout(() => resolve(x, console.log(x)), 1000));
//     return p;
// }
// Promise.race([runAsync(1), runAsync(2), runAsync(3)])
//     .then((res) => console.log("result: ", res))
//     .catch((err) => console.log("err", err));

// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
// }
// async function async2() {
//     console.log("async2");
// }
// async1();
// console.log('start')

// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
// }
// async function async2() {
//     setTimeout(() => {
//         console.log('timer') //第二轮 第一个宏任务
//     }, 0)
//     console.log("async2");
// }
// async1();
// console.log("start")

/*
    async1 start  / async2 / start  / async1 end / timer

*/
// async function async1() {
//     console.log("async1 start");
//     await async2();
//         console.log("async1 end");
//         setTimeout(() => {
//             console.log('timer1')  //第三个 宏任务
//         }, 0)
// }
// async function async2() {
//     setTimeout(() => {  //第一个 宏任务
//         console.log('timer2')
//     }, 0)
//     console.log("async2");
// }
// async1();
// setTimeout(() => { //第二个 宏任务
//     console.log('timer3')
// }, 0)
// console.log("start")
/*
    async1 start / async2 / start / async1 end / timer2 / timer3 / timer1 
*/

// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {  // 等待 返回结果,
//         console.log('promise1')
//     })
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1')
//         resolve('promise1 resolve')
//     }).then(res => console.log(res))
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')
/*
    srcipt start
    async1 start
    promise1
    srcipt end
    promise1 resolve
    async1 success
    async1 end
*/

// async function async1() {
//   console.log('async1 start');
//   await new Promise(resolve => {
//     console.log('promise1')
//     resolve('promise resolve')
//   })
//   console.log('async1 success');
//   return 'async1 end' // Promise.resolve('async1 end')
// }
// console.log('srcipt start')
// async1().then(res => {
//   console.log(res)
// })
// new Promise(resolve => {
//   console.log('promise2')
//   setTimeout(() => { //第一个 宏任务
//     console.log('timer')
//   })
// })
/*
    srcipt start / async1 start / promise1 / promise2 / async1 success / async1 end / timer
*/

// async function async1() {
//   console.log("async1 start");
//   let a= await async2();
//   console.log(a)
//   console.log("async1 end"); //不执行
// }

// async function async2() {
//   return new Promise(()=>{

//   })
// }

// console.log("script start");

// setTimeout(function () { //第一个宏任务
//   console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () { //第一个微任务
//   console.log("promise2");
// });
// console.log('script end')
/*
  script start / async1 start / async2 / promise1 / script end / promise2 /
*/

// async function testSometing() {
//   console.log("执行testSometing");
//   return "testSometing"; //成功返回。
// }

// async function testAsync() {
//   console.log("执行testAsync");
//   return Promise.resolve("hello async");
// }

// async function test() {
//   console.log("test start...");
//   const v1 = await testSometing(); //第一个微任务
//   console.log(v1);
//   const v2 = await testAsync(); //第三个微任务
//   console.log(v2);
//   console.log(v1, v2);
// }

// test();

// var promise = new Promise(resolve => {
//   console.log("promise start...");
//   resolve("promise");
// });
// promise.then(val => console.log(val));  //第二个 微任务

// console.log("test end...");

/*
  test start.. / 执行testSometing / promise start... / test end... / testSometing / 执行testAsync / promise  / hello async / testSometing hello async
*/

// const first = () => (new Promise((resolve, reject) => {
//   console.log(3);
//   let p = new Promise((resolve, reject) => {
//     console.log(7);
//     setTimeout(() => {  //第一个宏任务
//       console.log(5);
//       resolve(6);
//       console.log(11,p)

//     }, 0)
//     resolve(1); // 状态为成功
//   });
//   resolve(2);  //整体状态成功 并 传入 2
//   p.then((arg) => { //第一个微任务 //<Primise success>
//     console.log(arg); //1
//   });
// }));
// first().then((arg) => {  // 第二个 微任务
//   console.log(arg);
// });
// console.log(4);
/*
  3 7 4 1 2 5  <Promise success : 1>
*/

// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => { //第一个宏任务 延迟2000
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => { //等待resolve，但没调用，一直等待
//     console.log('promise1')
//   })
//   // console.log('async1 end')
//   // return 'async1 success'  //相当于 return Promise.reslove('async1 success')  但是上一个阻塞所以不执行
// }
// console.log('script start');
// async1().then(res => console.log(res)); //第一个微任务  //不执行
// console.log('script end');
// Promise.resolve(1)
//   .then(2) //第二个微任务
//   .then(Promise.resolve(3)) //第三个微任务
//   .catch(4) //第四个微任务
//   .then(res => console.log(res)) //第五个微任务  //1
// setTimeout(() => { //第二个宏任务
//   console.log('timer2')
// }, 1000)
/*
  script start / async1 / promise1 / script end /1 /timer2 /timer1
*/

// const p1 = new Promise((resolve) => {
//   setTimeout(() => { //第一个宏任务
//     resolve('resolve3');
//     console.log('timer1')
//   }, 0)
//   resolve('resovle1'); //状态确定 resolve1
//   resolve('resolve2');
// }).then(res => { //第一个微任务
//   console.log(res)
//   setTimeout(() => { //第二个宏任务
//     console.log(p1)
//   }, 1000)
// }).finally(res => {  //第二个微任务
//   console.log('finally', res)
// })
/*
  resovle1 / finally undefined /  timer1 / Promise<fulfiled : 1>
*/

// const arr = [1, 2, 3];
// arr.reduce((e,i)=>{
//   return e.then((e)=>{
//     console.log(e)
//   })
// },Promise.resolve(1))

// ----------------------------------------------->
// function red() {
//   console.log("red");
// }
// function green() {
//   console.log("green");
// }
// function yellow() {
//   console.log("yellow");
// }
// const light = function (timer, cb) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       cb()
//       resolve()
//     }, timer)
//   })
// }
// const step = function () {
//   Promise.resolve().then(() => {
//     return light(3000, red)
//   }).then(() => {
//     return light(2000, green)
//   }).then(() => {
//     return light(1000, yellow)
//   }).then(() => {
//     return step()
//   })
// }

// step();
// --------------------------------------------------<

// function flatDeep(arr, d = 1) {
//     return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) 
//       : val)
//     ,[]) 
//     :arr.slice();
// };

var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
// flatDeep(arr1, Infinity);
console.log([arr1.join(',').split(',')])