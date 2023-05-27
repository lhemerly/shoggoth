const Message = require("../Messages/Message");

class Tool {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  use(input) {
    let output = new Message("Assistant", "Observation: " + input);
    return output;
  }
}

module.exports = Tool;
