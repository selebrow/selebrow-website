# URL parameters

You can specify additional query parameters in `wsEndpoint` URL:

## `arg`

Additional command line arguments to pass to the browser binary. Corresponds to Playwright [args](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-args)
launch option.

Example: `arg=--arg1&arg=--arg2=value`

## `env`

Additional environment ariables to set in browser pod/container. corresponds to Playwright [env](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-env)
launch option.

Example: `env=VAR1=val1&env=VAR2=val2`

## `headless`

If set to `false` the browser is started in headful mode under X Server and with VNC enabled. If set to `true` (default) browser is started
in headless mode. Corresponds to Playwright [headless](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-headless)
launch option.

Also see [Chrome headless notes](./playwright.md#chrome-headless-notes).

## `channel`
Browser distribution channel. Requires additional binaries inside the images.

Corresponds to Playwright [channel](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-channel)
launch option.

Set to `chromium` to start Chrome/Chromium in "new headless" mode. Also see [Chrome headless notes](./playwright.md#chrome-headless-notes).

## `firefoxUserPref`
Firefox user preferences

Corresponds to Playwright [firefoxUserPrefs](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-firefox-user-prefs)
launch option.

Example: `firefoxUserPref=int.pref=1&firefoxUserPref=bool.pref=true&firefoxUserPref=str.pref=qwerty`
