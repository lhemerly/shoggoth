const { spawnSync } = require("child_process");
const Message = require("../Messages/Message");
const Tool = require("./Tool");

class CodeExecutionTool extends Tool {
  constructor() {
    super(
      "CodeExecutionTool",
      "This tool executes JavaScript code and returns the console output."
    );
  }

  use(code) {
    const executionResult = this.runCode(code);
    const output = executionResult.stdout.toString().trim();
    const message = new Message(
      "Assistant",
      `Observation: Code execution result: ${output}`
    );
    return message;
  }

  runCode(code) {
    const result = spawnSync("node", ["-e", code]);
    return result;
  }
}

module.exports = CodeExecutionTool;
