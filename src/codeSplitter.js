function splitCode(content, maxTokenLimit = 7500) {
  const avgCharsPerToken = 4;
  const maxCharLimit = maxTokenLimit * avgCharsPerToken;

  const lines = content.split("\n");
  let chunks = [];
  let currentChunk = "";
  let currentCharCount = 0;

  lines.forEach((line) => {
    const lineLength = line.length;

    // Check if adding the next line would exceed the character limit
    if (currentCharCount + lineLength <= maxCharLimit) {
      currentChunk += line + "\n";
      currentCharCount += lineLength;
    } else {
      // Once the limit is reached, start a new chunk
      chunks.push(currentChunk);
      currentChunk = line + "\n";
      currentCharCount = lineLength;
    }
  });

  // Add the last chunk if it's not empty
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

module.exports = { splitCode };
