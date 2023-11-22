// src/embeddings.js
const OpenAI = require("openai");
const { splitCode } = require("./codeSplitter");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

      console.log(`Generated embedding for ${name}`);

      embeddings.push({
        fileName: name,
        embedding: response.data[0].embedding,
      });
    }
  }

  return embeddings;
}

module.exports = { generateEmbeddings };
