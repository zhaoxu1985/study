const fs = require('fs')
const utils = require('loader-utils')

function fileLoader(compiler) {
    this.emitFile('abc.jpg', compiler)
    const fileName = utils.interpolateName(this, "[hash]")
    console.log(fileName, 9)
    return `abc.jpg`
}
fileLoader.raw = true
module.exports = fileLoader