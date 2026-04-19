## 2023-10-27 - [Token Cache Optimization in Convos/Convo.js]
**Learning:** Found a specific O(n) re-tokenization bottleneck where the same conversation history messages are repeatedly re-tokenized during `adjustConvo`. Using a standard `Map` instead of `WeakMap` is necessary because cached items can be primitive strings in addition to objects.
**Action:** When caching properties associated with function arguments that may be primitives, ensure standard `Map` is used to prevent runtime errors.
