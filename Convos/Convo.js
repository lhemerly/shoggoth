class Convo {
  #history = [];
  #convo = [];
  #max_input_tokens = 0;

  constructor(history = [], max_input_tokens = 0) {
    this.#history = history;
    this.#max_input_tokens = max_input_tokens;
  }

  getText(message_list) {
    return message_list.map((message) => message.text).join("\n");
  }

  adjustConvo(tokenizer) {
    this.#convo = [this.#history[0]];
    let token_count = 0;
    let i = this.#history.length - 1;
    while (i > 0 && token_count < this.#max_input_tokens) {
      const tokens = tokenizer(this.getText([this.#history[i]]));
      token_count += tokens.length;
      if (token_count > this.#max_input_tokens) {
        break;
      }
      this.#convo.splice(-1, 0, this.#history[i]);
      i--;
    }
    this.#convo.reverse();
  }

  addMessage(message) {
    this.#history.push(message);
  }

  get convo() {
    return this.#convo;
  }

  get history() {
    return this.#history;
  }

  get max_input_tokens() {
    return this.#max_input_tokens;
  }

  set max_input_tokens(value) {
    if (typeof value !== "number") {
      throw new Error("value must be a number");
    }
    if (value < 0) {
      throw new Error("value must be greater than 0");
    }
    if (!Number.isInteger(value)) {
      throw new Error("value must be an integer");
    }
    this.#max_input_tokens = value;
  }
}

module.exports = Convo;
