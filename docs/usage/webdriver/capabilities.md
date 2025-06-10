# Capabilities

You can use the capabilities below to customize your browser requests.

## `browserName`

_String_ **Mandatory**

Browser name to request as defined in [Browsers catalog](../../configuration/browsers.md#browser)

## `browserVersion`

_String_

Specific browser version to use as defined in [Browsers catalog](../../configuration/browsers.md#versiontags).
If not set, the [default version](../../configuration/browsers.md#defaultversion) will be used.

## `selenoid:options`

_Object_

Capabilities extension which allows you to request additional properties:

### `name`

_String_

Test/TestSuite name - this value is displayed in the UI on the Webdriver sessions list page. Doesn't have any special meaning - for informational purposes only.

### `env`

_Array of Strings_

Additional environment variables to be injected into browser containers/pods, merged with [browser catalog's envs](../../configuration/browsers.md#env) with higher precedence:

```json
"env": [
    "MY_ENV_VAR1=value1",
    "MY_ENV_VAR2=value2"
] 
```

### `flavor`

_String_

Browser image [flavor](../../configuration/browsers.md#flavor) to use.

### `screenResolution`

_String_

Screen resolution to set for X Server. Value format is `WIDTHxHEIGHTxBPP`:
```json
"screenResolution": "1920x1080x24"
```

### `enableVNC`

_Boolean_

When set to `true` it's possible to connect to a Webdriver session using VNC client (or directly from UI).

### `hostsEntries`

_Array of Strings_

Additional host entries to add to `/etc/hosts` inside browser pods/containers:
```json
"hostsEntries": [
    "host1:1.1.1.1",
    "host2:host-gateway"    
]
```

A special `host-gateway` value can be used to create a host entry for the Docker host (works with Docker backend only).

### `labels`

_Map String → String_

Additional labels to set on browser pods/containers, merged with [browser catalog's labels](../../configuration/browsers.md#labels)
with higher precedence:
```json
"labels": {
    "label-1": "value1",
    "label-2": "value2"
}
```

### `applicationContainers`

_Array of Strings_, applies to Docker backend only.

Browser containers' [links](https://docs.docker.com/engine/network/links/):
```json
"applicationContainers": [
    "cont1:alias1",
    "cont2:alias2"    
]
```

### `additionalNetworks`

_Array of Strings_, applies to Docker backend only.

Additional Docker networks for browser containers to connect to:
```json
"additionalNetworks": [
    "net1",
    "net2"    
]
```
