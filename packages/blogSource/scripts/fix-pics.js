const fs = require("fs");
const path = require("path");
const {
  getUrlFromString,
  getFileIdFromUrl,
  readAllFiles,
} = require("./utils/fileUtils");

const blogRoot = path.resolve(__dirname, "..");
const postPath = path.resolve(blogRoot, "source");
const OSSPath = path.resolve(blogRoot, "oss");
const assetsPath = path.resolve(blogRoot, "source", "assets", "images");

const allImageUrls = readAllFiles(OSSPath, [".webp", ".png", ".jpg"]);
const allFiles = readAllFiles(postPath, [".md", ".html"]);

allFiles.forEach((file) => {
  const filePath = path.join(file.path, file.name);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const newFileContent = [];
  lines.forEach((line) => {
    let newLine = line;
    if (line.includes("imgs.borgor.cn")) {
      const imageUrls = getUrlFromString(newLine);
      imageUrls.forEach((url) => {
        const fileId = getFileIdFromUrl(url);
        const image = allImageUrls.find((image) => image.fileId === fileId);
        if (image) {
          const imagePath = path.join(image.path, image.name);
          const distPath = path.join(assetsPath, image.name);
          fs.cpSync(imagePath, distPath);
          newLine = newLine.replace(url, `/assets/images/${image.name}`);
        }
      });
    }
    newFileContent.push(newLine);
  });
  fs.writeFileSync(filePath, newFileContent.join("\n"));
});
