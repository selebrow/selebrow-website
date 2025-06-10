---
slug: quota
---

# Quota and queueing

To avoid taking up all available resources by running multiple tests in parallel Selebrow provides simple quota management capabilities, which allow you to limit the number of concurrently running browsers.

When the browser limit is reached, all new requests are placed into a waiting queue until a browser becomes available or a timeout is reached.

For further details, please refer to the [Browser limit and queue parameters](../configuration/parameters.md#browser-limit-and-queue-parameters) documentation.
