const axios = require("axios");

class Model {
  #name = "";
  #apiKey = "";
  #max_tokens = 0;
  #tokenizer = "";
  #model_api_endpoint = "";

  constructor(name, apiKey, max_tokens, tokenizer, model_api_endpoint) {
    this.#name = name;
    this.#apiKey = apiKey;
    this.#max_tokens = max_tokens;
    this.#tokenizer = tokenizer;
    this.#model_api_endpoint = model_api_endpoint;
  }

  async send(mask, convo) {
    const data = {
      model: this.#name,
      messages: convo,
      temperature: mask.temperature,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.#apiKey}`,
    };

    try {
      const response = await axios.post(this.#model_api_endpoint, data, {
        headers,
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  get name() {
    return this.#name;
  }

  get apiKey() {
    return this.#apiKey;
  }

  get max_tokens() {
    return this.#max_tokens;
  }

  get tokenizer() {
    return this.#tokenizer;
  }

  get model_api_endpoint() {
    return this.#model_api_endpoint;
  }

  set name(name) {
    this.#name = name;
  }

  set apiKey(apiKey) {
    this.#apiKey = apiKey;
  }

  set max_tokens(max_tokens) {
    this.#max_tokens = max_tokens;
  }

  set tokenizer(tokenizer) {
    this.#tokenizer = tokenizer;
  }

  set model_api_endpoint(model_api_endpoint) {
    this.#model_api_endpoint = model_api_endpoint;
  }
}

module.exports = Model;
