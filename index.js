const Convo = require("./Convos/Convo");
const SummarizationMask = require("./Masks/Summarizator");
//eslint-disable-next-line
const { encode, decode } = require("gpt-3-encoder");

class Shoggoth {
  constructor(tools) {
    this.tools = tools;
    this.verbose = true;
    this.tool_error = {
      role: "assistant",
      content: "Observation: No such tool exists.",
    };
    this.mask = null;
    this.model = null;
  }

  parseMessage(message) {
    const tool = this.tools[message.tool];
    if (tool) {
      return tool.use(message.tool_input);
    } else {
      return this.tool_error;
    }
  }

  async sendConvo(convo) {
    let message = await this.model.send(this.mask, convo.convo);
    console.log(message);
    message = JSON.parse(message);
    convo.addMessage(message);
    if (message.tool === "Send_Message") {
      return message;
    }
    this.answerHook(this.mask, convo, message, this.model);
    message = this.parseMessage(message);
    if (encode(message.content).length > this.model.max_tokens) {
      message.content = this.summarizeText(message.content);
    }
    console.log(message);
    convo.history.push(JSON.stringify(message));
    convo.adjustConvo(this.model.tokenizer);
    this.sendConvo(convo);
  }

  //eslint-disable-next-line
  answerHook(mask, convo, message, model) {}

  async summarizeText(text) {
    const original_mask = this.mask;
    const summarizationMask = new SummarizationMask();
    const convoBase = [
      summarizationMask.system_prompt,
      ...summarizationMask.examples_prompt,
    ];
    const convo = new Convo(convoBase);
    convo.max_input_tokens = 2000;
    const userMessage = { role: "user", text };
    convo.addMessage(userMessage);
    this.mask = summarizationMask;

    let summary = text;
    while (encode(summary).length > this.model.max_tokens) {
      const response = await this.sendConvo(convo);
      summary = response.content;
      userMessage.text = summary;
    }

    this.mask = original_mask;
    return summary;
  }
}

module.exports = Shoggoth;
