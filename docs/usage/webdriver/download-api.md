# Accessing downloaded files

Selebrow provides an API for working with the browser's download directory:

## `GET /download/{sessionId}`

List the contents of the browser's download directory. By default the response body is returned in human-readable html format. 
Set `json` query parameter to get machine-readable response.

URL path parameters:
* `sessionId` - Webdriver session id

URL query parameters:
* `json` - If this parameter is set, the response is returned in the json format (array of strings - file names) 

## `GET /download/{sessionId}/{fileName}`

Retrieves the file contents from download directory in the response body.

URL path parameters:
* `sessionId` - Webdriver session id
* `fileName` - File name to retrieve

## `DELETE /download/{sessionId}/{fileName}`

Deletes the file from the download directory.

URL path parameters:
* `sessionId` - Webdriver session id
* `fileName` - File name to retrieve

Response codes:
* `200` - File was deleted successfully
* `404` - File doesn't exist
* `500` - Error occurred while deleting the file

## Working with download directory example

```typescript
const assert = require('node:assert');
const { remote } = require('webdriverio');
const download = require('download');
const axios = require('axios');

const host = '127.0.0.1';
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
            "wdio:enforceWebDriverClassic": true, // disable BiDi protocol as Selebrow doesn't support it yet

            "goog:chromeOptions": {
              "prefs": {
                "plugins.always_open_pdf_externally": true,
                "profile.default_content_setting_values.automatic_downloads": 1,
                "download.prompt_for_download": false
              }
            },
        }
    });

    console.log(browser.sessionId);

    try {
        // list download directory contents
        const resp1 = await axios.get(`http://${host}:${port}/download/${browser.sessionId}?json=true`);
        console.log(resp1.data);
        assert.deepEqual(resp1.data, []);

        // make browser to download file
        await browser.url('https://github.com/selebrow/images/archive/refs/tags/v1.0.1.zip');
        await delay(5000)

        // list download directory contents
        const resp2 = await axios.get(`http://${host}:${port}/download/${browser.sessionId}?json=true`);
        console.log(resp2.data);
        assert.deepEqual(resp2.data, ['images-1.0.1.zip']);
        const fileName = resp2.data[0];

        // get remote downloaded file lcocally
        await download(`http://${host}:${port}/download/${browser.sessionId}/${fileName}`, './')

        // delete file from download directort
        await axios.delete(`http://${host}:${port}/download/${browser.sessionId}/${fileName}`)

        // list download directory contents
        const resp3 = await axios.get(`http://${host}:${port}/download/${browser.sessionId}?json=true`);
        console.log(resp3.data);
        assert.deepEqual(resp3.data, []);
    } finally {    
        await browser.deleteSession();
    }

})().catch((e) => console.error(e));
```
