const Message = require("../Messages/Message");

class Tool {
  // Constructor
  constructor(name, description, use_function) {
    this.#name = name;
    this.#description = description;
    this.use = use_function;
  }

  #name = "";
  #description = "";

  use(input) {
    let output = new Message("Assistant", "Observation: " + input);
    return output;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  set name(name) {
    this.#name = name;
  }

  set description(description) {
    this.#description = description;
  }
}

module.exports = Tool;
