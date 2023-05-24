const Tool = require("./Tool");

class Send_Message extends Tool {
  #name = "Send Message";
  #description = "Send a message to the user.";
  //eslint-disable-next-line
  #use_function = (input) => {
    return;
  };
}

module.exports = Send_Message;
