export const config = {
  EXCLUDED_DIRS: ["node_modules", "build"], // ignore these directories
  FILE_EXTENSIONS: {
    include: [".jsx", ".tsx", ".ts", ".js", ".cs", ".py"],
    ignore: [".env", ".json"],
  },
  REPO_PATH: "", // path to local repo. can be overridden by command line
};
