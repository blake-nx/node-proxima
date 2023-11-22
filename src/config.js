module.exports = {
  OPENAI_API_KEY: "your-openai-api-key", // required
  PINECONE_API_KEY: "your-pinecone-api-key", // optional - will generate CSV if this is not provided
  EXCLUDED_DIRS: ["node_modules", "build"], // ignore these directories
  FILE_EXTENSIONS: {
    include: [".jsx", ".tsx", ".ts", ".js", ".cs", ".py"],
    ignore: [".png", ".env", ".json"],
  },
  REPO_PATH: "", // path to local repo. can be overridden by command line
};
