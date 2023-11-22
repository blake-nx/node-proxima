const { promises: fs } = require("fs");
const path = require("path");
const config = require("./config");

async function readFilesFromDirectory(dir) {
  let fileContents = [];
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (shouldProcessFile(file)) {
      const filePath = path.join(dir, file);
      const content = await fs.readFile(filePath, "utf8");
      fileContents.push({ name: file, content });
    }
  }
  return fileContents;
}

function shouldProcessFile(filename) {
  const ext = path.extname(filename);
  return (
    config.FILE_EXTENSIONS.include.includes(ext) &&
    !config.FILE_EXTENSIONS.ignore.includes(ext)
  );
}
