# Accessing the clipboard

Selebrow provides an API for accessing the clipboard of the running browser:

## `GET /clipboard/{sessionId}`

Returns plain text clipboard contents in the response.

URL path parameters:
* `sessionId` - Webdriver session id

## `POST /clipboard/{sessionId}`

Updates plain text clipboard contents with request body.

URL path parameters:
* `sessionId` - Webdriver session id

## Accessing remote clipboard example
```typescript
const assert = require('node:assert');
const { remote } = require('webdriverio');
const axios = require('axios');

const host = 'localhost';
const port = 4444;
(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const browser = await remote({
        hostname: host,
        port: port,
        path: '/wd/hub',
        capabilities: {
            browserName: 'chrome',
            // browserVersion: '123.0',  // omit to run default (latest) version
            "wdio:enforceWebDriverClassic": true // disable BiDi protocol as Selebrow doesn't support it yet
        }
    });

    console.log(browser.sessionId);

    try {
        await browser.url('https://clipboardjs.com/');
        const button = await browser.$('button=Copy to clipboard');
        console.log(await button.getText());
        await button.click();
        // get remote clipboard contents
        const response = await axios.get(`http://${host}:${port}/clipboard/${browser.sessionId}`);
        console.log(response.data);
        assert.equal(response.data, 'Just because you can doesn\'t mean you should — clipboard.js');
        // set remote clipboard contents
        await axios.post(`http://${host}:${port}/clipboard/${browser.sessionId}`, "hello from Selebrow");
    } finally {    
        await browser.deleteSession();
    }

})().catch((e) => console.error(e));
```
