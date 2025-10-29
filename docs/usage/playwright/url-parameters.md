# URL parameters

You can specify additional query parameters in `wsEndpoint` URL:

## `arg`

Additional command line arguments to pass to the browser binary. Corresponds to Playwright [args](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-args)
launch option.

Example: `arg=--arg1&arg=--arg2=value`

## `env`

Additional environment variables to set in browser pod/container. corresponds to Playwright [env](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-env)
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

## `resolution`
Screen resolution to set for X Server, applies only when `headless` is set to `false`. Value format is `WIDTHxHEIGHTxBPP`.

Example: `resolution=1920x1080x24`

## `link`
Browser containers' [links](https://docs.docker.com/engine/network/links/), applies to Docker backend only.

Example: `link=cont1:alias1&link=cont2:alias2`

## `host`
Additional host entries to add to `/etc/hosts` inside browser pods/containers, applies to Docker backend only.

Example: `host=host1:1.1.1.1&host=host2:host-gateway`

## `network`
Additional Docker networks for browser containers to connect to, applies to Docker backend only.

Example: `network=net1&network=net2`

## `label`
Additional labels to set on browser pods/containers, merged with [browser catalog's labels](../../configuration/browsers.md#labels) with higher precedence.

Example: `label=label-1:value1&label=label-2:value2`