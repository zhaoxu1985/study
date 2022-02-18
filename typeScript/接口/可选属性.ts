interface Color {
   readonly color?:string,
    size?:number
    a?:string
}
function createColor(conf:Color):{a?:string} {
    let newStr = {color:'white',a:'312',s:4124}
    console.log(conf)
    return newStr
}
// createColor({color:'tasdf'})

interface Color2 {
    color?:string,
    size?:number
}
let num:Color2 = {color:'red'}
num.color = 'white'