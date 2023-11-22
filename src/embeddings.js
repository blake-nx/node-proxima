// src/embeddings.js
const OpenAI = require("openai");
const config = require("./config");
const { splitCode } = require("./codeSplitter");

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

async function generateEmbeddings(fileContents) {
  const embeddings = [];

  for (const { name, content } of fileContents) {
    const chunks = splitCode(content);

    for (const chunk of chunks) {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunk,
      });

      embeddings.push({
        fileName: name,
        embedding: response.data[0].embedding,
      });
    }
  }
  console.log(embeddings);
  return embeddings;
}

module.exports = { generateEmbeddings };
