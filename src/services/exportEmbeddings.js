const { Pinecone } = require("@pinecone-database/pinecone");
const fs = require("fs");
const fastcsv = require("fast-csv");
require("dotenv").config();

/**
 * Exports embeddings to Pinecone DB or to a CSV file.
 *
 * @param {Array<Object>} embeddings - An array of embedding objects.
 */
async function exportEmbeddings(embeddings) {
  // Check if Pinecone API key is available for Pinecone DB storage
  if (process.env.PINECONE_API_KEY) {
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: "gcp-starter",
    });

    // Initialize Pinecone index
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    console.log("Exporting embeddings to Pinecone DB...");
    try {
      for (const embedding of embeddings) {
        await index.upsert([
          {
            id: embedding.fileName,
            values: embedding.embedding,
          },
        ]);
      }
    } catch (error) {
      console.error(`Error exporting to Pinecone DB: ${error.message}`);
    }
  } else {
    // If Pinecone API key is not available, export embeddings to a CSV file
    try {
      const ws = fs.createWriteStream("embeddings.csv");
      fastcsv.write(embeddings, { headers: true }).pipe(ws);
      console.log("Embeddings exported to embeddings.csv");
    } catch (error) {
      console.error(`Error exporting to CSV: ${error.message}`);
    }
  }
}

module.exports = { exportEmbeddings };