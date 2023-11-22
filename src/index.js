const path = require("path");
const { readFilesFromDirectory } = require("./fileReader");
const config = require("./config");
const { generateEmbeddings } = require("./embeddings");

async function main() {
  // Check for command-line argument or config for directory path
  const dir = path.resolve(process.argv[2] || config.REPO_PATH);
  if (!dir) {
    console.error(
      "Error: No repository path provided. Must be absolute path to local repository.\nTip: use node index.js <path-to-repo>"
    );
    process.exit(1);
  }

  const fileContents = await readFilesFromDirectory(dir, config.EXCLUDED_DIRS);
  const embeddings = await generateEmbeddings(fileContents);
}

main().catch(console.error);
