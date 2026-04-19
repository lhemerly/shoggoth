const Tool = require("./Tool");

class Send_Message extends Tool {
  constructor() {
    super("Send Message", "Send a message to the user.", () => {
      return;
    });
  }
}

module.exports = Send_Message;
