const Tool = require("./Tool");

class Send_Message extends Tool {
  constructor() {
    super("Send Message", "Send a message to the user.");
  }

  //eslint-disable-next-line
  use = (input) => {
    return;
  };
}

module.exports = Send_Message;
