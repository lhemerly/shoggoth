## 2024-05-18 - [adjustConvo WeakMap primitive failure]
**Learning:** In `Convo.js`, `history` entries can be primitive strings in addition to `Message` objects depending on how messages are added. Using a `WeakMap` for caching properties derived from messages (like token lengths) will throw a fatal `TypeError` since `WeakMap` keys must be objects.
**Action:** Use a standard `Map` instead of `WeakMap` when caching message metadata in the `Convo` system to safely handle both object references and primitive string keys.
## 2024-05-18 - [adjustConvo nested map caching]
**Learning:** When caching token lengths in an AI backend, you cannot simply cache by message identity because 1) the application supports multiple models (tokenizers) and 2) message contents can be mutated in-place by callers.
**Action:** Always key caches by both the tokenizer reference and the actual message content (string) to prevent cross-model collisions and stale token counts.
