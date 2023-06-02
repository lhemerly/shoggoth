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

  async parseMessage(message) {
    const toolName = message.tool;
    const tool = this.tools.find((tool) => tool.name === toolName);
    if (tool) {
      return await tool.use(message.tool_input);
    } else {
      return this.tool_error;
    }
  }

  // Method to return a JSON inside a string. It should consider the biggest JSON possible.
  findJSON(message) {
    let json = "";
    let jsonStart = message.indexOf("{");
    let jsonEnd = message.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      json = message.substring(jsonStart, jsonEnd + 1);
    }
    return json;
  }

  async sendConvo(convo) {
    let message = await this.model.send(this.mask, convo.convo);
    console.log(message);
    message = this.findJSON(message);
    message = JSON.parse(message);
    convo.addMessage({
      role: "assistant",
      content: JSON.stringify(message),
    });
    if (message.tool === "SendMessage") {
      return message;
    }
    this.answerHook(this.mask, convo, message, this.model);
    message = await this.parseMessage(message);
    if (encode(message.content).length > this.model.max_tokens) {
      message.content = await this.summarizeText(message.content);
    }
    console.log(message);
    convo.addMessage(message);
    convo.adjustConvo(this.model.tokenizer);
    console.log(convo.convo);
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
    while (encode(summary).length > convo.max_input_tokens) {
      const response = await this.sendConvo(convo);
      summary = response.content;
    }

    this.mask = original_mask;
    return summary;
  }
}

module.exports = Shoggoth;
