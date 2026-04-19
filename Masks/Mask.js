class Mask {
  // Constructor
  constructor(
    temperature = this.#temperature,
    role = this.#role,
    goal = this.#goal,
    additional_information = this.#additional_information,
    base_tools = this.#base_tools,
    system_prompt = this.#system_prompt,
    examples_prompt = this.#examples_prompt
  ) {
    this.#temperature = temperature;
    this.#role = role;
    this.#goal = goal;
    this.#additional_information = additional_information;
    this.#base_tools = base_tools;
    this.#system_prompt = system_prompt;
    this.#examples_prompt = examples_prompt;
    this.updateSystemPrompt();
  }

  #temperature = 0;

  #role = "You are a helpful AI assistant.";

  #goal = "help the user.";

  #additional_information = `You only tell the truth. If you don't know the answer, 
                            you should tell the user that you don't know`;

  #base_tools = ["Message"];

  #system_prompt = {
    role: "system",
    content: `${this.#role} 
              Your goal is to ${this.#goal}
              ${this.#additional_information}
              You can use the following tools: ${this.#base_tools.join(", ")}
              `,
  };

  #examples_prompt = [
    {
      role: "user",
      content: "Hello ",
    },
    {
      role: "assistant",
      content: `
      {
        "thoughts": "I should say hello and ask what the user wants.",
        "tool": "Send_Message",
        "tool_input": "Hello, how can I help you?"
      }
      `,
    },
  ];

  updateSystemPrompt() {
    this.#system_prompt = {
      role: "system",
      content: `${this.#role} 
                Your goal is to ${this.#goal}
                ${this.#additional_information}
                You can use the following tools: ${this.#base_tools.join(", ")}
                `,
    };
  }

  // Getters
  get temperature() {
    return this.#temperature;
  }

  get role() {
    return this.#role;
  }

  get goal() {
    return this.#goal;
  }

  get additional_information() {
    return this.#additional_information;
  }

  get base_tools() {
    return this.#base_tools;
  }

  get system_prompt() {
    return this.#system_prompt;
  }

  get examples_prompt() {
    return this.#examples_prompt;
  }
}

module.exports = Mask;
