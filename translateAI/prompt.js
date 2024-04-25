import readline from "readline";
import inquirer from "inquirer";
import TranslateAI from "./translateAI.js";

const translateAI = new TranslateAI();

// Get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the text you want to translate: ", (text) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "language",
        message: "Which language do you want to translate to?",
        choices: translateAI.languageOptions,
      },
    ])
    .then(async ({ language }) => {
      const languageCode = translateAI.getLanguageCode(language);
      console.log(`English: ${text}`);
      console.log('Translating...');
      const {translation_text} = await translateAI.translate(text, 'en_XX', languageCode);
      console.log(`Translation:`, translation_text);
      rl.close();
    });
});