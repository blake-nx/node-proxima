const { promises: fs } = require("fs");
const path = require("path");
const config = require("./config");

/**
 * Recursively reads files from a directory, excluding specified directories.
 *
 * @param {string} dir - The directory to read files from.
 * @param {string[]} excludedDirs - An array of directories to exclude.
 * @returns {Promise<Array>} An array of objects, each containing the file name, content, and path.
 */
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

    // Process directories and files
    if (entry.isDirectory()) {
      // Recurse into subdirectories that are not excluded
      if (!excludedDirs.includes(entry.name)) {
        fileContents = fileContents.concat(
          await readFilesFromDirectory(entryPath, excludedDirs)
        );
      }
    } else if (shouldProcessFile(entry.name)) {
      // Read file content if it should be processed
      const content = await fs.readFile(entryPath, "utf8");
      fileContents.push({ name: entry.name, content, path: entryPath });
    }
  }

  return fileContents;
}

/**
 * Determines if a file should be processed based on its extension.
 *
 * @param {string} filename - The name of the file to check.
 * @returns {boolean} - True if the file should be processed, false otherwise.
 */
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
