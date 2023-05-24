const Model = require("./Model");
const {encode, decode} = require("gpt-3-encoder")

class GPT3_5 extends Model {
  
  constructor(){
    super();
    this.name = "gpt-3.5-turbo";
    this.tokenizer = encode;
    this.max_tokens = 4096;
    this.model_api_endpoint = "https://api.openai.com/v1/chat/completions";
  }
}

module.exports = GPT3_5;
