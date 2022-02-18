const Koa = require('koa');
const app = new Koa();


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

// response

app.use(async ctx => {
    let buffer = ''
    ctx.req.on('data', (data) => {
        buffer += data
    })
    ctx.req.on('end', (data) => {
        ctx.body = 'hello';
        console.log(buffer, 'buffer')
    })

});

app.listen(3000);