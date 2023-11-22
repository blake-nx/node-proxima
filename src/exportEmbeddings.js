const { Pinecone } = require("@pinecone-database/pinecone");
const fs = require("fs");
const fastcsv = require("fast-csv");
require("dotenv").config();

async function exportEmbeddings(embeddings) {
  if (process.env.OPENAI_API_KEY) {
    // Store in Pinecone DB
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: "gcp-starter",
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    console.log("Exporting embeddings to Pinecone DB...");
    for (const embedding of embeddings) {
      await index.upsert([
        {
          id: embedding.fileName,
          values: embedding.embedding,
        },
      ]);
    }
  } else {
    // Export to CSV
    const ws = fs.createWriteStream("embeddings.csv");
    fastcsv.write(embeddings, { headers: true }).pipe(ws);
    console.log("Embeddings exported to embeddings.csv");
  }
}

module.exports = { exportEmbeddings };
