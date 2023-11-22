const path = require("path");
const { readFilesFromDirectory } = require("./fileReader");
const config = require("./config");

async function main() {
  // Check for command-line argument or config for directory path
  const repoPathArg = process.argv[2] || config.REPO_PATH;
  if (!repoPathArg) {
    console.error(
      "Error: No repository path provided. Must be absolute path to local repository.\nTip: use node index.js <path-to-repo>"
    );
    process.exit(1);
  }

  const repoPath = path.resolve(repoPathArg);
  const fileContents = await readFilesFromDirectory(repoPath);
}

main().catch(console.error);
