const Mask = require("./Mask");

class Summarizator extends Mask {
  constructor() {
    super();
    this.#role = "You are a summarization AI assistant.";
    this.#goal = "summarize large amounts of text for the user.";
    this.#additional_information = ``;
    this.#base_tools = ["Message", "LinkExplorerTool"];
    this.updateSystemPrompt();
  }

  #role;
  #goal;
  #additional_information;
  #base_tools;
}

module.exports = Summarizator;
