import { OpenAI } from "openai";
import { splitCode } from "../utils/codeSplitter.js";
import dotenv from "dotenv";
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates embeddings for the contents of the provided files.
 *
 * @param {Array<Object>} fileContents - An array of objects containing file names and content.
 * @returns {Promise<Array>} An array of objects, each containing a file name and its embeddings.
 */
export async function generateEmbeddings(fileContents) {
  const embeddings = [];

  for (const { name, content } of fileContents) {
    const chunks = splitCode(content);

    for (const chunk of chunks) {
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk,
        });

        console.log(`Generated embedding for ${name}`);
        embeddings.push({
          fileName: name,
          embedding: response.data[0].embedding,
          content: chunk,
        });
      } catch (error) {
        console.error(
          `Error generating embedding for ${name}: ${error.message}`
        );
      }
    }
  }

  return embeddings;
}
