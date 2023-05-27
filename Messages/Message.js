class Message {
  #role = "";
  #content = "";

  constructor(role, content) {
    this.#role = role;
    this.#content = content;
  }

  get role() {
    return this.#role;
  }

  get content() {
    return this.#content;
  }

  set role(role) {
    this.#role = role;
  }

  set content(content) {
    this.#content = content;
  }
}

module.exports = Message;
