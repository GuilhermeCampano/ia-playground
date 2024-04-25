import readline from "readline";
import ImageAI from "./imageAI.js";

// Get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the path to the image you want to detect: ", async (imagePath) => {
    const predictions = await ImageAI.detectImage(imagePath);
    console.log("Predictions:", predictions);
    rl.close();
});