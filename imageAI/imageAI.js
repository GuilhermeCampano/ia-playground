import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from "dotenv";


class ImageAI {
  #apiKey;
  constructor() {
    dotenv.config();
    this.#apiKey = process.env.HUGGING_FACE_API_KEY;
  }

  async detectImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    console.log('Detecting image...');
    const response = await fetch('https://api-inference.huggingface.co/models/google/vit-base-patch16-224', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.#apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: base64Image
      })
    });

    const data = await response.json();
    return data;
  }
}

export default new ImageAI();