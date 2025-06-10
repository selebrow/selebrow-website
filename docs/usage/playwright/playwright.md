---
sidebar_position: 1
---

# Playwright

## Test project settings

In your Playwright [test project](https://playwright.dev/docs/test-projects) settings, set the [connectOptions.wsEndpoint](https://playwright.dev/docs/api/class-testoptions#test-options-connect-options) 
in the following format: `ws://localhost:4444/pw/<chrome|firefox|webkit>/[playwright version]`. You can omit the version part, but be prepared 
to update the `playwright` and `@playwright/test` versions in your `package.json` when the [default version](../../configuration/browsers.md#defaultversion) of the Playwright image changes.

Refer to the [URL parameters page](url-parameters.md) for a full list of additional supported parameters.

## Chrome headless notes

Starting from Playwright 1.49.0 (Chrome 130/Chromium 131) the Chrome binary was split into two separate binaries: `headless-shell` and
`chrome` (you can read more about this [here](https://developer.chrome.com/blog/chrome-headless-shell)).

You now have three different modes for running Chrome:

* **"old headless"** (default) — Uses the `headless-shell` binary.
* **"new headless"** — Enabled via the `channel=chromium` URL parameter; uses the "real" `chrome` binary.
* **"headful"** — Enabled by setting `headless=false`; starts Chrome with a GUI under an X server, and allows connecting to it via VNC.

## Config excerpt example

```typescript
export default defineConfig({
    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                connectOptions: {
                    wsEndpoint: 'ws://localhost:4444/pw/chrome/1.49.0'  // your playwright dependencies must match this version
// wsEndpoint: "ws://localhost:4444/pw/chrome" // image default version will be used
// wsEndpoint: "ws://localhost:4444/pw/chrome/1.42.1?arg=--arg1&arg=--arg2=value"  // you can pass command line argumets to the browser
// wsEndpoint: "ws://localhost:4444/pw/chrome/1.42.1?channel=chromium // run Chrome in "headless new" mode (supported since Playwright 1.49.0)
// wsEndpoint: "ws://localhost:4444/pw/chrome/1.42.1?headless=false   // run in headful mode (also enables VNC)
// wsEndpoint: "ws://localhost:4444/pw/chrome/1.42.1?env=PW_TEST_SCREENSHOT_NO_FONTS_READY=1&env=PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS=1 // pass additional environemnt variables

                }
            }
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                connectOptions: {
                    wsEndpoint: 'ws://localhost:4444/pw/firefox/1.49.0'
// wsEndpoint: 'ws://localhost:4444/pw/firefox/1.49.0?firefoxUserPref=something.enable=false'  // set additional Firefox User prefs
                }
            },
        }
        {
            name: 'iPhone 11 Pro',
            use: {
                ...devices['iPhone 11 Pro'], // webkit browser will be used, see https://github.com/microsoft/playwright/blob/v1.49.0/packages/playwright-core/src/server/deviceDescriptorsSource.json#L521
                connectOptions: {
                    wsEndpoint: 'ws://localhost:4444/pw/webkit/1.49.0'
                }
            },
        }
...
```
