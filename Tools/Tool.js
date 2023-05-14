const Message = require("../Messages/Message");

class Tool {
  name = "";
  description = "";

  use(input) {
    let output = new Message("Assistant", "Observation: " + input);
    return output;
  }
}

module.exports = Tool;
