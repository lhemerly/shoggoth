const Tool = require("./Tool");

class SendMessageTool extends Tool {
  constructor() {
    super("Send Message", "Send a message to the user");
  }

  //eslint-disable-next-line
  use = (input) => {
    return;
  };
}

module.exports = SendMessageTool;
