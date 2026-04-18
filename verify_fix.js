const Tool = require("./Tools/Tool");
const Send_Message = require("./Tools/Send_Message");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

console.log("Tool class:");
const myTool = new Tool("My Tool", "Does something useful.", (input) => input);
assert(myTool.name === "My Tool", 'name getter returns "My Tool"');
assert(
  myTool.description === "Does something useful.",
  "description getter returns correct value"
);
myTool.name = "Renamed Tool";
assert(myTool.name === "Renamed Tool", 'name setter updates to "Renamed Tool"');
myTool.description = "Updated description.";
assert(
  myTool.description === "Updated description.",
  "description setter updates correctly"
);

console.log("\nSend_Message subclass:");
const sendMsg = new Send_Message();
assert(sendMsg.name === "Send Message", 'name is "Send Message"');
assert(
  sendMsg.description === "Send a message to the user.",
  "description is correct"
);
assert(
  typeof sendMsg.use === "function",
  "use property is a function on the instance"
);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
