const fs = require('fs');
const http = require('http')

const app = http.createServer()
app.listen(9090,console.log('9090'))
app.on('request',(req,res)=>{
    if(req.url=='/'){
        res.end(fs.readFileSync('./public/html/1.html'))
    }
    else{
        console.log(req.url);
        try{
            let urlFormat = req.url.substr(req.url.lastIndexOf('public'))
            res.end(fs.readFileSync(`./${urlFormat}`))
        }catch{
            console.log('不存在');
                res.writeHead(302,{
                    Location:'./public/html/notNull.html'
                })
                res.end()
        }
    }
})