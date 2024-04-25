import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

export default class TranslateAI {
  constructor() {
    dotenv.config();
    this.hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
  }

  #languages = new Map([
    ["Portuguese", "pt_XX"],
    ["Vietnamese", "vi_VN"],
    ["German", "de_DE"],
    ["Spanish", "es_XX"],
    ["Polish", "pl_PL"],
  ])

  get languageOptions() {
    return Array.from(this.#languages.keys());
  }

  getLanguageCode(language) {
    return this.#languages.get(language);
  }
  async translate(inputs, src_lang = "en_XX", tgt_lang = "pt_XX") {
    const translation = await this.hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs,
      parameters: { src_lang, tgt_lang },
    });
    return translation;
  }
}
