const fs = require('fs')
const join = require('path').join

module.exports = {
  /**
  * @description 获取文件目录及文件结构
   * @param jsonPath {String} 文件路径
   * */
  getJsonFiles: function(jsonPath) {
    const jsonFiles = []
    function findJsonFile(path) {
      const files = fs.readdirSync(path)
      files.forEach(function(item, index) {
        const fPath = join(path, item)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) {
          findJsonFile(fPath)
        }
        if (stat.isFile() === true) {
          jsonFiles.push(fPath.replace(jsonPath, '.'))
        }
      })
    }
    findJsonFile(jsonPath)
    return jsonFiles
  }
}
