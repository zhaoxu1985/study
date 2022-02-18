const express = require('express');
const compression = require('compression')
let app = express();
app.use(compression())
app.use(express.static('dist'))
app.listen(3000,function () { 
   
})
