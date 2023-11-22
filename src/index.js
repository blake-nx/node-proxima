const path = require("path");
const { readFilesFromDirectory } = require("./fileReader");
const config = require("./config");
const { generateEmbeddings } = require("./services/generateEmbeddings");
const { exportEmbeddings } = require("./services/exportEmbeddings");

async function main() {
  // Resolve the directory path from command-line argument or from the config file
  const dir = path.resolve(process.argv[2] || config.REPO_PATH);

  // Check if the resolved directory path is valid
  if (!dir || dir === ".") {
    console.error(
      "Error: No repository path provided. Provide an absolute path to a local repository.\n" +
        "Usage: node index.js <path-to-repo>"
    );
    process.exit(1);
  }

  // Read files from the specified directory, excluding any specified in config
  const fileContents = await readFilesFromDirectory(dir, config.EXCLUDED_DIRS);

  // Generate embeddings for the read files
  const embeddings = await generateEmbeddings(fileContents);

  // Export the generated embeddings
  await exportEmbeddings(embeddings);
}

// Run the main function and catch any unhandled errors
main().catch((error) => {
  console.error("An error occurred:", error.message);
});
