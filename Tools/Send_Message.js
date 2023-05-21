const Tool = require("./Tool");

class Send_Message extends Tool {
  #name = "Send Message";
  #description = "Send a message to the user.";
  #use_function = (input) => { // eslint-disable-line no-unused-vars
    return;
  }
}

module.exports = Send_Message;
