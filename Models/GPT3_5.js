const Model = require("./Model");
const Tokenizer = require("gpt-tokenizer")

class GPT3_5 extends Model {
  name = "gpt-3.5-turbo";
  tokenizer = new Tokenizer();
  max_tokens = 4096;
}

module.exports = GPT3_5;
