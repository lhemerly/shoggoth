const Tools = require("./Tools/Tool");

class Shoggoth {
  verbose = true;

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

  async sendConvo(mask, convo, model) {
    let message = await model.send(mask, convo.convo);
    message = JSON.parse(message);
    convo.addMessage(message);
    if (message.tool === "Send_Message") {
      return message;
    }
    this.answerHook(mask, convo, message, model);
    message = this.parseMessage(message);
    convo.history.push(JSON.stringify(message));
    convo.adjustConvo(model.tokenizer);
    this.sendConvo(mask, convo, model);
  }

  answerHook(mask, convo, message, model) {
    if (this.verbose) {
      console.log(mask + convo + message + model);
    }
  }
}

module.exports = Shoggoth;
