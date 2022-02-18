for ( let i =0;i<5;i++){    
    let str = `     `;
    let newStr = str.substring(i,5);
       let strx = '*************'
    console.log(newStr,i==0?'*':strx.substring(0,i*2+1))
}