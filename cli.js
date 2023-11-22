/**
 * Starts the CLI and prompts the user for input.
 */
async function startCLI() {
  try {
    // Using inquirer to prompt the user for the repository path
    const answers = await inquirer.prompt([
      {
        type: "input", // Input type is a simple text input
        name: "repoPath", // The key to reference the answer
        message: "Enter the absolute path to the repository:", // The prompt message displayed to the user
      },
      // Additional questions can be added here if needed
    ]);

    // Calling main process with the path provided by the user
    main(answers.repoPath);
  } catch (error) {
    // Error handling in case the prompt fails or the main function throws an error
    console.error(`Error: ${error.message}`);
  }
}

startCLI();
