const { promises: fs } = require("fs");
const path = require("path");
const config = require("./config");

async function readFilesFromDirectory(
  dir,
  excludedDirs = config.EXCLUDED_DIRS
) {
  let fileContents = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip hidden directories (those starting with '.')
    if (entry.name.startsWith(".")) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirs.includes(entry.name)) {
        fileContents = fileContents.concat(
          await readFilesFromDirectory(entryPath, excludedDirs)
        );
      }
    } else if (shouldProcessFile(entry.name)) {
      const content = await fs.readFile(entryPath, "utf8");
      fileContents.push({ name: entry.name, content, path: entryPath });
    }
  }

  return fileContents;
}

function shouldProcessFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return (
    (!config.FILE_EXTENSIONS.include ||
      config.FILE_EXTENSIONS.include.includes(ext)) &&
    (!config.FILE_EXTENSIONS.ignore ||
      !config.FILE_EXTENSIONS.ignore.includes(ext))
  );
}

module.exports = { readFilesFromDirectory };
