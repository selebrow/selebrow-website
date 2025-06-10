# Accessing Chrome DevTools

Selebrow provides a way to directly connect to Chrome [DevTools protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/).
To use this feature just connect to the `/devtools/{sessionId}` endpoint (where sessionId is current Webdriver session id)

## Recording trace via CDP example

```typescript
const { remote } = require('webdriverio');
const puppeteer = require('puppeteer-core');

const host = 'localhost';
const port = 4444;

(async () => {
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
        const devtools = await puppeteer.connect({ 
            browserWSEndpoint: `ws://${host}:${port}/devtools/${browser.sessionId}` 
        });
        try {
            const page = await devtools.newPage();
            await page.tracing.start({
                path: 'trace.json',
                screenshots: true
            })
            await page.goto('https://selebrow.dev');
            await page.tracing.stop()
        } finally {
            await devtools.close();
        }
    } finally {    
        await browser.deleteSession();
    }

})().catch((e) => console.error(e));
```
