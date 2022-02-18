const img = require('../images/bgyl.jpg')
const a = () => {
    const img = document.createElement('img')
    img.src = img
    img.width = 500;
    document.body.innerHTML = `<img src="../images/bgyl.jpg"></img>`
}
a()