// 1. The first comment from copilot states that if a different tokenizer is used, the length could be different, so caching by `message` alone isn't enough. It should probably be a composite key of the message + tokenizer, or cache by message text + tokenizer instead of message object.
// Wait! If the user edits the message text (the second comment says this can happen), then caching by message *identity* (object reference) leaves stale token counts.
// So both problems can be solved by caching by a composite key of: `tokenizer` (or tokenizer.name / reference) and `message.text` / `message.content` (the actual string content)!
// Let's look at `getText(message)`. It returns a string.
// What if we just cache the token length using the *generated text string* and the *tokenizer function* as a combined key? Or a nested map: tokenizer -> text -> length? Or just text as key, if tokenizer rarely changes?
// Actually, `this.#tokenCache = new Map();`
// We can use a nested map: `this.#tokenCache.get(tokenizer).get(text)`
// Let's do that!
