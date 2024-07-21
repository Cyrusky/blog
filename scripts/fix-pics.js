const fs = require('fs')
const path = require('path')

const blogRoot = path.resolve(__dirname, '..')
const postPath = path.resolve(blogRoot, 'source', '_posts')
const OSSPath = path.resolve(blogRoot, 'oss')
const assetsPath = path.resolve(blogRoot, 'source', 'assets', 'images')

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

const allImageUrls = readAllFiles(OSSPath, ['.webp', '.png', '.jpg'])
const allFiles = readAllFiles(postPath, ['.md', '.html'])

const getUrlFromString = (str) => {
  let reg = /(https?|http|ftp|file):\/\/imgs\.borgor\.cn\/[\u4e00-\u9fa5\x00-\xffA-Za-z0-9]*.[a-z]{2,5}/g;
  str = str.match(reg);
  return str
}

const getFileIdFromUrl = (url) => {
  return url.split('/').pop().split('.')[0]
}

allFiles.forEach(file => {
  const filePath = path.join(file.path, file.name)
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const newFileContent = []
  lines.forEach(line => {
    let newLine = line
    if (line.includes('https://imgs.borgor.cn')) {
      const imageUrls = getUrlFromString(newLine)
      imageUrls.forEach(url => {
        const fileId = getFileIdFromUrl(url)
        const image = allImageUrls.find(image => image.fileId === fileId)
        if (image) {
          const imagePath = path.join(image.path, image.name)
          const distPath = path.join(assetsPath, image.name)
          fs.cpSync(imagePath, distPath)
          newLine = newLine.replace(url, `/assets/images/${image.name}`)
        }
      })
    }
    newFileContent.push(newLine)
  })
  fs.writeFileSync(filePath, newFileContent.join('\n'))
})
