class Message {
  constructor(role_, content_) {
    this.#role = role_;
    this.#content = content_;
  }
  #role = "";
  #content = "";

  get role() {
    return this.#role;
  }

  get content() {
    return this.#content;
  }

  set role(role_) {
    this.#role = role_;
  }

  set content(content_) {
    this.#content = content_;
  }
}

module.exports = Message;
