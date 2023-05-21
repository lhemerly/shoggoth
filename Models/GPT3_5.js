const Model = require("./Model");
const Tokenizer = require("gpt-tokenizer")

class GPT3_5 extends Model {
  #name = "gpt-3.5-turbo";
  #tokenizer = new Tokenizer();
  #max_tokens = 4096;
  #model_api_endpoint = "https://api.openai.com/v1/completions";
}

module.exports = GPT3_5;
