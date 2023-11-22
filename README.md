<div align="center">

![Proxima Logo](https://i.imgur.com/dHVNujZ.png)

# Node Proxima - Convert Codebases to AI Embeddings
  
</div>

## Description

Node Proxima is a Node.js application designed to automate the transformation of entire codebases into AI embeddings, facilitating seamless integration with vector databases like Pinecone. Harnessing the power of OpenAI's text-embedding-ada-002 model, Proxima meticulously converts every file in a repository into detailed embeddings.

This tool serves as a step towards redefining your interaction with code. By enabling the creation of AI agents that possess the full context of your repository, Proxima opens new avenues for in-depth code analysis and intelligent data utilization.

## Key Features

- **Efficient Parsing**: Processes entire code repositories.
- **Embedding Generation**: Creates embeddings from all code files using OpenAI's embeddings API.
- **Vector Database Integration**: Seamlessly stores embeddings in Pinecone for advanced querying.
- **CSV Export**: If no Pinecone API key is provided, it will export the embeddings to a CSV file.

## Installation

To install Node Proxima, execute the following commands:

```bash
git clone https://github.com/yourusername/node-proxima.git
cd node-proxima
npm install
```

## Usage

Run Node Proxima with the following command:

```bash
npm start
```

The CLI will prompt you to enter the absolute path to the repository you wish to process.

## Configuration

Configure Node Proxima by setting up a .env file in the root directory with the following variables:

- OPENAI_API_KEY: Your OpenAI API key for generating embeddings.
- PINECONE_API_KEY: (Optional) Your Pinecone API key if using Pinecone as the vector database.

Additionally, adjust the following settings in the src/config.js file:

- FILE_EXTENSIONS: Specify which file extensions to include or ignore during processing.
- EXCLUDED_DIRS: Define directories to exclude, such as node_modules.
- PINECONE_INDEX_NAME: Set the Pinecone index name if using Pinecone for storage.

## License

Node Proxima is released under the [MIT License](https://opensource.org/license/mit/).

## Todos:

- Add parsing of remote repositories.
- Add API key and ignore file extension/directory options in the CLI prompt.
