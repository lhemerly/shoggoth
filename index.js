const Tools = require("./tools");

class Shoggoth {
  tool_error = {
    role: "assistant",
    content: "Observation: No such tool exists.",
  };

  parseMessage(message) {
    if (Object.prototype.hasOwnProperty.call(Tools, message.tool)) {
      // If the tool exists, use it
      return Tools[message.tool](message.tool_input);
    } else {
      // If the tool doesn't exist, sends an error message
      return this.tool_error;
    }
  }

  sendConvo(mask, convo, model) {
    let message = JSON.parse(model.send(mask, convo));
    convo.history.push(message);
    if (message.tool === "Send_Message") {
      return message;
    }
    message = this.parseMessage(message);
    convo.history.push(message);
    convo.adjustConvo(model.tokenizer);
    this.sendConvo(mask, convo, model);
  }
}

module.exports = Shoggoth;
