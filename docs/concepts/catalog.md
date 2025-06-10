---
sidebar_position: 1
slug: catalog
---

# Browser catalog

When a specific browser version is requested Selebrow uses its browser catalog to map the browser version to an image (along with other settings such as ports and environment).

By default the catalog is loaded at startup from the following path: `config/browsers.yaml` (relative to current directory).
If the file does not exist the catalog will be loaded from the Selebrow images repository. The remote file is updated automatically whenever new browser images are built.

You can view the default catalog [here](https://selebrow.dev/browsers.yaml).

See description of [`browsers-uri`](../configuration/parameters.md#browsers-uri) and [`fallback-browsers-uri`](../configuration/parameters.md#fallback-browsers-uri) parameters

For detailed information about the catalog structure please refer to the [Browsers catalog format reference](../configuration/browsers.md)
