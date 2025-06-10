---
sidebar_position: 0
---

# Webdriver

## Remote connection

Connect to Selebrow as a remote Webdriver host using the `http://localhost:4444/wd/hub` URL. If you deployed Selebrow
on a dedicated server or Kubernetes replace localhost with the relevant hostname. 

Use standard `browserName` and `browserVersion` capabilities to set specific browser and version you want to use.
Refer to the [capabilities page](capabilities.md) for a full list of supported capabilities.

:::note
Since Selbrow doesn't support BiDi protocol yet, you need to set `wdio:enforceWebDriverClassic` capability to `true` 
to disable BiDi protocol when using [WebdriverIO](https://webdriver.io/) test framework.
:::

## Example
```typescript
const { remote } = require('webdriverio');
const assert = require('node:assert');

const host = '127.0.0.1';
const port = 4444;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
    const browser = await remote({
        hostname: host,
        port: port,
        path: '/wd/hub',
        capabilities: {
            browserName: 'chrome',
            // browserVersion: '123.0',  // omit to run default (latest) version
            "selenoid:options": {
              name: "My test", // session name to display in UI
              env: ["NO_PROXY=localhost,127.0.0.1"], // additional environment variables
              enableVNC: true, // enable VNC server & connection in UI
              screenResolution: "1024x768x24", // screen resolution for X server desktop              
              flavor: "default", // you can select alternative image flavor
              hostsEntries: ["github.com:10.2.3.4", "host.docker.internal:host-gateway"], // additional entries to /etc/hosts
              labels: {l1: "v1"}, // additional pod/container labels
              // applicationContainers: ["cont1:alias1"], // additional Docker links
              // additionalNetworks: ["ext-net"] // additional Docker netwroks to connect to
            },
            "wdio:enforceWebDriverClassic": true // disable BiDi protocol as Selebrow doesn't support it yet
        }
    });

    console.log(browser.sessionId);
    console.log(browser.capabilities.browserVersion);

    try {
        await browser.url(process.env.SITE_URL || 'https://selebrow.dev');
        await delay(15000);
        await browser.saveScreenshot("screen.png");        
    } finally {    
        await browser.deleteSession();
    }

})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
```
