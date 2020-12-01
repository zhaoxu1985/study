var start=new Date();
do{
    var end = new Date();
}while(end-start<3000);
console.log('执行完了');


// 接收消息
onmessage=function(e){
    this.console.log(e.data)
    postMessage("再给你："+e.data)
}
// 发送消息
