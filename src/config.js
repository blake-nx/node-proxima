module.exports = {
  OPENAI_API_KEY: "", // required
  PINECONE_API_KEY: "", // optional - will generate CSV if this is not provided
  PINECONE_ENV: "", // optional - defaults to "gcp-starter"
  EXCLUDED_DIRS: ["node_modules", "build"], // ignore these directories
  FILE_EXTENSIONS: {
    include: [".jsx", ".tsx", ".ts", ".js", ".cs", ".py"],
    ignore: [".env", ".json"],
  },
  REPO_PATH: "", // path to local repo. can be overridden by command line
};
