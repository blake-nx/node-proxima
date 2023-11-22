module.exports = {
  OPENAI_API_KEY: "your-openai-api-key", // required
  PINECONE_API_KEY: "your-pinecone-api-key", // optional - will generate CSV if this is not provided
  FILE_EXTENSIONS: {
    include: [".jsx", ".tsx", ".js", ".cs", ".py"],
    ignore: [".png", ".env", ".json"],
  },
};
