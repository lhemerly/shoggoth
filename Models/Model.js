const axios = require("axios");

class Model {
  // Properties
  name = "";
  apiKey = "";
  max_tokens = 0;
  tokenizer = "";
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  };

  // Interfaces
  async send(mask, convo) {
    const data = {
      model: this.name,
      messages: convo,
      temperature: mask.temperature,
    };

    const message = await axios
      .post(this.model_api_endpoint, data, this.headers)
      .then((response) => response.data.choices[0].message.content)
      .catch((error) => {
        console.error(error);
        throw error;
      });

    return message;
  }
}

module.exports = Model;
