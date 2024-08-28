const path = require('path')
const {readAllFiles} = require('./utils/fileUtils')
const matter = require('gray-matter');
const fs = require("node:fs");
const sharp = require("sharp");

const rootPath = path.resolve(__dirname, '..')
const thumbnailPath = path.resolve(rootPath, 'source', 'assets', 'thumbnail')
const imagePath = path.resolve(rootPath, 'source', 'assets', 'images')

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, {recursive: true})
}
if (!fs.existsSync(thumbnailPath)) {
  fs.mkdirSync(thumbnailPath, {recursive: true})
}

const allMarkdownFiles = readAllFiles(path.resolve(rootPath, 'source', '_posts'), ['.md'])

allMarkdownFiles.forEach(file => {
  const markdownPath = path.join(file.path, file.name)
  const content = fs.readFileSync(markdownPath, 'utf8')
  const result = matter(content)
  if (!result.data.cover) return;
  const coverUrl = result.data.cover;
  const sourcePath = path.join(rootPath, 'source', coverUrl);
  const distPath = sourcePath.replace(imagePath, thumbnailPath);

  if (!fs.existsSync(sourcePath)) {
    console.log(`File not found: ${sourcePath}`)
    return;
  }

  if (fs.existsSync(distPath)) {
    fs.unlinkSync(distPath)
  }

  if (!fs.existsSync(thumbnailPath)) {
    fs.mkdirSync(thumbnailPath, {recursive: true})
  } else if (!fs.statSync(thumbnailPath).isDirectory()) {
    fs.unlinkSync(thumbnailPath)
    fs.mkdirSync(thumbnailPath, {recursive: true})
  }

  result.data.thumbnail = result.data.cover.replace('/assets/images/', '/assets/thumbnail/')
  const fileContent = result.stringify()
  if (!fs.existsSync(path.dirname(markdownPath))) {
    fs.mkdirSync(path.dirname(markdownPath), {recursive: true})
  }

  sharp(sourcePath)
    .resize(200, 200)
    .toFile(distPath, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        fs.writeFileSync(markdownPath, fileContent)
      }
    })
})
