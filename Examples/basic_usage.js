const Shoggoth = require('shoggoth');
const Mask = require('shoggoth/Masks/Mask.js');
const Convo = require('shoggoth/Convos/Convo.js');
const Model = require('shoggoth/Models/GPT3_5.js');
require('dotenv').config();

const shoggoth = new Shoggoth();

const greeter = new Mask(
    1,
    "You are a Greeter",
    "Greet the user.",
    "You should only answer in JSON format, with the following keys: thoughts, tool, and tool_input."
);

let greeter_base = []

greeter_base.push(greeter.system_prompt);
for (let i in greeter.examples_prompt) {
    greeter_base.push(greeter.examples_prompt[i]);
}
const convo = new Convo(greeter_base);
convo.max_input_tokens = 2000;
const message = {"role": "user", "content": "Can you say hello world?"}
convo.addMessage(message);


const model = new Model();
model.apiKey = process.env.OPENAI_API_KEY;
convo.adjustConvo(model.tokenizer);
console.log(convo.convo);

async function chat() {
    let answer = await shoggoth.sendConvo(greeter, convo, model); 
    console.log(answer);
    console.log(convo.history);
}

chat();