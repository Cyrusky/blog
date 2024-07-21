const fs = require("fs");
const path = require("path");
const getUrlFromString = (str) => {
  let reg = /(https?|http|ftp|file):\/\/imgs\.borgor\.cn\/[\u4e00-\u9fa5\x00-\xffA-Za-z0-9]*.[a-z]{2,5}/g;
  str = str.match(reg);
  return str
}

const getFileIdFromUrl = (url) => {
  return url.split('/').pop().split('.')[0]
}

const readAllFiles = (rootDir, extensions = []) => {
  const files = fs.readdirSync(rootDir, {recursive: true, withFileTypes: true})
  return files.filter(file => {
    if (file.isDirectory()) return false
    if (extensions.length === 0) return true
    return extensions.includes(path.extname(file.name))
  }).map(file => {
    return {
      ...file,
      fileId: file.name.split('.')[0],
    }
  })
}

module.exports = {
  readAllFiles,
  getUrlFromString,
  getFileIdFromUrl
}
