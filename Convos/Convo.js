class Convo {
  constructor(history_ = new Array(), max_input_tokens_ = 0) {
    this.#history = history_;
    this.#max_input_tokens = max_input_tokens_;
  }

  #history = new Array();
  #convo = new Array();
  #max_input_tokens = 0;

  // Function to return an input array as text
  getText(message_list) {
    if (!Array.isArray(message_list)) {
      return message_list.text + "/n ";
    }
    return message_list.map((message) => message.text + "/n ").join("");
  }

  /**
   * Function to make #convo the 0 element of #history plus n elements
   * starting from the last one until the total token count is less than
   * #max_input_tokens.
   */
  adjustConvo(tokenizer) {
    let token_count = 0;
    let i = this.#history.length - 1;

    // Performance optimization: Find the starting index first to avoid inefficient array splicing
    // By determining how many historical messages fit in the token limit, we can then push them
    // sequentially in a subsequent loop, which avoids O(n^2) behavior from repeated splices.
    while (i > 0 && token_count < this.#max_input_tokens) {
      let tokens = tokenizer(this.getText(this.#history[i]));
      token_count += tokens.length;
      if (token_count > this.#max_input_tokens) {
        break;
      }
      i--;
    }

    this.#convo = new Array();
    if (this.#history.length > 0) {
      this.#convo.push(this.#history[0]);
    }
    for (let j = i + 1; j < this.#history.length; j++) {
      this.#convo.push(this.#history[j]);
    }
  }

  /**
   * Function to add a message to the #history array.
   *
   * @param {Message} message
   */
  addMessage(message) {
    this.#history.push(message);
  }

  /**
   * Function to return the #convo array.
   *
   * @returns {Array}
   */
  get convo() {
    return this.#convo;
  }

  /**
   * Function to return the #history array.
   *
   * @returns {Array}
   */
  get history() {
    return this.#history;
  }

  /**
   * Function to return the #max_input_tokens variable.
   *
   * @returns {Number}
   */
  get max_input_tokens() {
    return this.#max_input_tokens;
  }

  /**
   * Function to set the #max_input_tokens variable.
   *
   * @param {Number} max_input_tokens
   * @returns {void}
   * @throws {Error} if max_input_tokens is not a number
   * @throws {Error} if max_input_tokens is less than 0
   * @throws {Error} if max_input_tokens is not an integer
   */
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
