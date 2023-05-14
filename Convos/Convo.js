class Convo {
  history = new Array();
  convo = new Array();
  max_input_tokens = 0;

  // Function to return an input array as text
  getText(message_list) {
    let text = "";
    for (let i = 0; i < message_list.length; i++) {
      text += message_list[i].text + "/n ";
    }
    return text;
  }

  /**
   * Function to make convo the 0 element of history plus n elements
   * starting from the last one until the total token count is less than
   * max_input_tokens.
   */
  adjustConvo(tokenizer) {
    this.convo = new Array();
    this.convo.push(this.history[0]);
    let token_count = 0;
    let i = this.history.length - 1;
    while (i >= 0 && token_count < this.max_input_tokens) {
      let tokens = tokenizer.encode(this.getText(this.history[i]));
      token_count += tokens.length;
      if (token_count > this.max_input_tokens) {
        break;
      }
      this.convo.push(this.history[i]);
      i--;
    }
  }
}

module.export = Convo;
