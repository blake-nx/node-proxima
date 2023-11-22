const { Pinecone } = require("@pinecone-database/pinecone");
const config = require("./config");
const fs = require("fs");
const fastcsv = require("fast-csv");

async function exportEmbeddings(embeddings) {
  if (config.PINECONE_API_KEY) {
    // Store in Pinecone DB
    const pinecone = new Pinecone({
      apiKey: config.PINECONE_API_KEY,
      environment: "gcp-starter",
    });
    const index = pinecone.Index("codechatter");

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
