const { spawnSync } = require("child_process");
const Tool = require("./Tool");

class CodeExecutionTool extends Tool {
  constructor() {
    super(
      "CodeExecution",
      "This tool executes JavaScript code and returns the console output."
    );
  }

  async use(code) {
    const executionResult = await this.runCode(code);
    const output = executionResult.stdout.toString().trim();
    const message = {
      role: "assistant",
      content: `Observation: Code execution result: ${output}`,
    };
    return message;
  }

  async runCode(code) {
    const result = spawnSync("node", ["-e", code]);
    return result;
  }
}

module.exports = CodeExecutionTool;
