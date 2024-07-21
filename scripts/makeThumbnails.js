const path = require('path')
const {readAllFiles} = require('./utils/fileUtils')
const matter = require('gray-matter');
const fs = require("node:fs");

const rootPath = path.resolve(__dirname, '..')

const allMarkdownFiles = readAllFiles(path.resolve(rootPath, 'source', '_posts'), ['.md'])

console.log(allMarkdownFiles);

allMarkdownFiles.forEach(file => {
  const content = fs.readFileSync(path.join(file.path, file.name), 'utf8')
  const result = matter(content)
  if (result.data.thumbnail || !result.data.cover) return;
  const coverUrl = result.data.cover;
  
})
