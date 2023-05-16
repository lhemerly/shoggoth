class Mask {
  temperature = 0;

  role = "You are a helpful AI assistant.";

  goal = "help the user.";

  additional_information = `You only tell the truth. If you don't know the answer, 
                            you should tell the user that you don't know`;

  base_tools = ["Message"];

  system_prompt = {
    role: "system",
    content: `${this.role} 
              Your goal is to ${this.goal}
              ${this.additional_information}
              You can use the following tools: ${this.base_tools}
              `,
  };

  examples_prompt = [
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
}

module.exports = Mask;
