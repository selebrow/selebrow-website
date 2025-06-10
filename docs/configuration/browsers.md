---
sidebar_position: 0
toc_max_heading_level: 4
slug: browsers
---

# Browser catalog format

## File structure

The browser catalog is a YAML file of the following format:
```yaml
playwright:
  <browser>:
    images:
      <flavor>:
        [browser options...]
webdriver:
  <browser>:
    images:
      <flavor>:
        [browser options...]
```
## Browser

You can configure as many browsers as you want. See how to request specific browser in [Webdriver](../usage/webdriver/webdriver.md) 
or [Playwright](../usage/playwright/playwright.md) sessions.

## Flavor

Flavor is a way to have different images of the same browser. For example you can build images containing some additional binary components like plugins. By default Selebrow will look for images defined with `default` flavor.
You can request a specific flavor in Webdriver or Playwright session requests.

## Browser options

### `image`

Image reference (without tag) for browser container.
```yaml
image: selebrow/selebrow-images/playwright/chrome
```

### `versionTags`

Mapping of the browser versions to actual image tags.
```yaml
versionTags:
  '133.0': v0.4.0-133.0
  '134.0': v0.4.0-134.0
  '135.0': v0.4.1-135.0
  '136.0': v0.4.5-136.0
```

See how to request specific browser version in [Webdriver](../usage/webdriver/webdriver.md) or [Playwright](../usage/playwright/playwright.md) sessions.

### `defaultVersion`

Default browser version to use in [versionTags](#versiontags) when no specific version was requested.

### `cmd`

Browser container command line.
```yaml
cmd:
  - sh
  - /entrypoint.sh 
```

### `env`

Environment variables to be injected into the browser container.
```yaml
env:
  LANG: en_US.UTF-8
  LANGUAGE: en_US:es
  TZ: America/Chicago
```

See how to override or set environment variables in [Webdriver](../usage/webdriver/webdriver.md) or [Playwright](../usage/playwright/playwright.md) sessions.

### `ports`

Defines actual port numbers as exposed by the image
```yaml
ports:
  browser: 4444     # Mandatory: Main port for Webdriver or Playwright server
  vnc: 5900         # VNC port (used when VNC is enabled)
  clipboard: 9090   # Webdriver only: port for clipboard service
  devtools: 7070    # Webdriver only: port for devtools service
  fileserver: 8080  # Webdriver only: port for fileserver service
```

See how to enable VNC in [Webdriver](../usage/webdriver/webdriver.md) or [Playwright](../usage/playwright/playwright.md) sessions.

### `path`

HTTP request path prefix to be added to every Webdriver/Playwright request when forwarding requests to browser port
```yaml
path: /wd/hub
```

Also see [ports](#ports)

### `limits`

Resource limits for browser containers (applies to both Kubernetes and Docker backends). For the Kubernetes backend the same values are also used for container [requests](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits)
```yaml
limits:
  cpu: '1'
  memory: 2Gi
```
Only `cpu` and `memory` resources are supported at the moment. The value must be in the [Kubernetes quantity type](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes) format.

### `labels`

Labels to be assigned to browser's Docker container or Kubernetes pod

```yaml
labels:
  label1: value1
  label-2: value-2
```

### `shmSize`

Applies to Docker backend only.

Shared memory size in bytes for browser's Docker container.
Corresponds to Docker [--shm-size run parameter](https://docs.docker.com/engine/containers/run/#runtime-constraints-on-resources)

```yaml
shmSize: 2147483648  # 2GB of shared memory
```

### `tmpfs`

Applies to Docker backend only.

Tmpfs mounts for browser's Docker container.
Corresponds to Docker [--tmpfs run parameter](https://docs.docker.com/engine/storage/tmpfs/)

```yaml
tmpfs:
  - /tmp
  - "/var/tmp:nodev"  # mount options are also supported
```
