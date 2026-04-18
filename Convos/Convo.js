class Convo {
  constructor(history_ = new Array(), max_input_tokens_ = 0) {
    this.#history = history_;
    this.#max_input_tokens = max_input_tokens_;
  }

  #history = new Array();
  #convo = new Array();
  #max_input_tokens = 0;

  // Cache to store message token lengths to prevent expensive re-tokenization
  #tokenCache = new Map();

  // Function to return an input array as text
  getText(message_list) {
    let text = "";
    for (let i = 0; i < message_list.length; i++) {
      text += message_list[i].text + "/n ";
    }
    return text;
  }

  /**
   * Function to make #convo the 0 element of #history plus n elements
   * starting from the last one until the total token count is less than
   * #max_input_tokens.
   *
   * ⚡ Optimization: Token generation (especially with gpt-3-encoder) is a
   * synchronous, CPU-intensive operation. We now cache the calculated token lengths
   * using a Map. This turns an O(n) tokenization cost per message add into an
   * O(1) cache lookup, drastically improving performance for long conversations.
   */
  adjustConvo(tokenizer) {
    this.#convo = new Array();
    this.#convo.push(this.#history[0]);
    let token_count = 0;
    let i = this.#history.length - 1;
    while (i > 0 && token_count < this.#max_input_tokens) {
      let message = this.#history[i];
      let msgLength = this.#tokenCache.get(message);

      // Compute and cache token length if not already present
      if (msgLength === undefined) {
        let tokens = tokenizer(this.getText(message));
        msgLength = tokens.length;
        this.#tokenCache.set(message, msgLength);
      }

      token_count += msgLength;
      if (token_count > this.#max_input_tokens) {
        break;
      }
      this.#convo.splice(-1, 0, message);
      i--;
    }
    this.#convo.reverse();
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
