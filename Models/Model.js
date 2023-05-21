const axios = require("axios");

class Model {
  
  // Constructor
  constructor(name, apiKey, max_tokens, tokenizer, model_api_endpoint) {
    this.#name = name;
    this.#apiKey = apiKey;
    this.#max_tokens = max_tokens;
    this.#tokenizer = tokenizer;
    this.#model_api_endpoint = model_api_endpoint;
  }

  // Properties
  #name = "";
  #apiKey = "";
  #max_tokens = 0;
  #tokenizer = "";
  #headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  };
  #model_api_endpoint = "";

  // Interfaces
  async send(mask, convo) {
    const data = {
      model: this.#name,
      messages: convo,
      temperature: mask.temperature,
    };

    const message = await axios
      .post(this.#model_api_endpoint, data, this.#headers)
      .then((response) => response.data.choices[0].message.content)
      .catch((error) => {
        console.error(error);
        throw error;
      });

    return message;
  }

  // Getters
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

  get headers() {
    return this.#headers;
  }

  get model_api_endpoint() {
    return this.#model_api_endpoint;
  }

  // Setters
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

  set headers(headers) {
    this.#headers = headers;
  }

  set model_api_endpoint(model_api_endpoint) {
    this.#model_api_endpoint = model_api_endpoint;
  }
  
}

module.exports = Model;
