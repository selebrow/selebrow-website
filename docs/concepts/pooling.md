---
slug: pooling
---

# Browser pooling

One of Selebrow's key performance optimizations is the browser pooling feature, which is enabled by default.

When a test suite completes and releases a browser Selebrow does not destroy the browser's container and places it into an idle pool. This allows the container to be reused by subsequent test suites, significantly reducing the overhead associated with creating new containers &ndash; 
an operation that can be particularly resource-intensive in busy Kubernetes environments.

For detailed information please refer to the [pool parameters](../configuration/parameters.md#pool-parameters) documentation.

It’s important to note that each combination of browser, version and environment results in a separate pool. 
The parameters mentioned above apply to each individual pool. For example, if one test is executed in Firefox and another in Chrome, 
there will be two distinct pools, each capable of maintaining up to [pool-max-idle](../configuration/parameters.md#pool-max-idle) idle browsers.
