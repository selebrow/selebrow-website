---
sidebar_position: 1
title: Parameters
---

Every command-line parameter corresponds to an environment variable which you can set instead.
For example, for `--param-name` there is the `SB_PARAM_NAME` environment variable. Environment variable names are
created by adding the `SB_` prefix to the capitalized parameter name, with all dashes (`-`) replaced by underscores (`_`).

## Common parameters

### `listen`

_String_, defaults to `0.0.0.0:4444` when Selebrow is started in Kubernetes or Docker container and `127.0.0.1:4444` otherwise.

(Optional) IP and port for Selebrow to listen on. Below are few valid examples

* `0.0.0.0:4444` - bind to all interfaces, listen on port 4444
* `:4444` - same as above
* `127.0.0.1:4444` - bind to 127.0.0.1 (loopback interface) only, listen on port 4444

### `backend`

_String_, defaults to `auto`

Backend to use, allowed values are:

* `auto` (default)
* `kubernetes` (see Kubernetes)
* `docker` (see Docker)

When this parameter is set to `auto` or not specified, the Kubernetes backend will be selected if Selebrow was started inside a Kubernetes pod. Otherwise the Docker backend will be used.

### `create-timeout`

_String_, defaults to `3m`

Time to wait for a browser container to start. The client will get an HTTP `504 Gateway Timeout` response if this timeout has occurred.
Can be increased in case browser Pods/Containers take a longer time to start (image pool is slow for example)
The value must be in the [Go Duration](https://pkg.go.dev/time#Duration) format.

### `connect-timeout`

_String_, defaults to `200ms`

Timeout set on connections made to browser containers. Used in browser readiness checks as well as in forwarded Webdriver/Playwright requests.
Consider increasing it if your network environment has lag issues.
The value must be in the [Go Duration](https://pkg.go.dev/time#Duration) format.

## Browsers catalog parameters

### `browsers-uri`

_String_, defaults to `config/browsers.yaml`

[Browser catalog](browsers.md) source to load at startup. Can be either local path ot http(s) URL

### `fallback-browsers-uri`

_String_, defaults to `https://selebrow.dev/browsers.yaml`

Used when [Browser catalog](browsers.md) couldn't be loaded using source specified in [`browsers-uri`](#browsers-uri)

## Kubernetes parameters

### `create-retries`

_Integer_, defaults to `5`

Number of retries for failed Kubernetes Pod create requests before returning HTTP `504 Internal server error`.
A retry is made whenever the `Reason` field has one of following values in the Kubernetes API response metadata:
* `Conflict`
* `TooManyRequests`
* `InternalError`
* `ServerTimeout`
* `Timeout`

### `kube-cluster-mode-out`

_Boolean_, defaults to `false`

Selebrow is expected to run inside a Kubernetes pod, so the Kubernetes client is created using [InClusterConfig](https://pkg.go.dev/github.com/kubernetes-client/go/kubernetes/config#InClusterConfig) by default.
However, this is not ideal for development, as you may want to run Selebrow under a debugger. In that case you can set `kube-cluster-mode-out` to `true`.

See also [`kube-config`](#kube-config) 

### `kube-config`

_String_, defaults to `$HOME/.kube/config`

Kubernetes client config file to use when [`kube-cluster-mode-out`](#kube-cluster-mode-out) is set to `true`.

### `kube-templates-path`

_String_, defaults to `config/`

Path to Kubernetes Pod template files. See [templates reference](templates.md) for details.

### `namespace`

_String_, defaults to `default`

Kubernetes namespace to create browser Pods in.

## Docker parameters

### `docker-platform`

_String_, not set by default

Docker platform for browser images.

By default, when looking for browser image, Docker will try to get the native image for the current platform and if that doesn't exist it will fall back to `amd64`

You can override this behaviour by explicitly setting the required platform for browser images. Below are valid examples for
the `docker-platform` parameter:

* `arm64` - Only look for `linux/arm64` images (no fallback to `amd64` will be made)
* `linux/arm64` same as above

### `docker-network`

_String_, not set by default

Docker network to use for browser containers.

When this parameter is not set (default), the following algorithm is used: 

If running in [port mapping mode](#docker-port-mapping), Docker  [default bridge](https://docs.docker.com/engine/network/drivers/bridge/#use-the-default-bridge-network) will be used.
Otherwise Selebrow will try to detect the current Docker network (assuming Selebrow itself has been started inside a Docker container)

### `docker-port-mapping`

_String_, defaults to `auto`

Container port mapping mode

* `auto` (default)
* `enabled` - explicitly enabled
* `disabled` - explicitly disabled

When this parameter is set to `auto`, port mapping mode is set to `disabled` if Selebrow is running inside Docker container itself
and to `enabled` otherwise.

### `docker-privileged`

_Boolean_, defaults to `false`

Enables [privileged](https://docs.docker.com/reference/cli/docker/container/run/#privileged) mode when running browser Containers.
It's not generally recommended to enable this flag. The Selebrow images are built to work in unprivileged mode.

### `docker-pull-images`

_Boolean_, defaults to `false`

By default, Selebrow pulls the browser image upon first request for browser/version. This way only the required images are pulled locally to save storage space at the exchange of a longer first browser request.

When this parameter is set to `true`, Selebrow will pull all images configured in the [Browser catalog](browsers.md) at startup.
This is useful for a server installation where you expect low browser startup time.

## Browser limit and queue parameters

### `quota-limit`

_Integer_, defaults to `0`

The maximum number of simultaneously running browsers. 

Some values of this parameter are treated specially:

* `0` (default) automatically calculate limit based on available resources. Currently implemented only for the Docker backend.
* `-1` unlimited quota

The client will get an HTTP `429 Too Many Requests` response if quota is exceeded, unless [queue-size](#queue-size) is set.

### `queue-size`

_Integer_, defaults to `25`

The size of the internal queue of browsers waiting for available quota.

When [quota-limit](#quota-limit) is set to a non negative value and the quota is full,
any new browser request will be put into an `internal queue` until either quota is available or [queue-timeout](#queue-timeout) is reached.
The client will get an HTTP `429 Too Many Requests` response if the queue is full.

### `queue-timeout`

_String_, defaults to `1m`

The time a browser can wait for available quota in the browsers queue.
The client will get an HTTP `429 Too Many Requests` response if this timeout occurred.

The value must be in the [Go Duration](https://pkg.go.dev/time#Duration) format

## Pool parameters

### `pool-max-idle`

_Integer_, defaults to `5`

Pool size for idle browser containers. When set to `0` the pooling feature is disabled.

### `pool-idle-timeout`

_String_, defaults to `1m`

The maximum time a browser container can be idle in the pool before eviction.

The value must be in the [Go Duration](https://pkg.go.dev/time#Duration) format

### `pool-max-age`

_String_, defaults to `15m`

If a browser is older than the value specified in this parameter it's unconditionally evicted from the pool (recycled).

The value must be in the [Go Duration](https://pkg.go.dev/time#Duration) format

## UI parameters

### `ui`

_Boolean_, defaults to `true`

The UI is enabled by default unless Selebrow was started in a CI environment.

### `vnc-password`

_String_

The VNC password to be used for connecting to browsers via the UI. The default value matches the default password in Selebrow images, which is `selebrow`.

## Logging parameters

Since logging is inititalized very early at startup, it can only be configured with environment variables, 
there are no corresponding command line parameters.

### `SB_LOG_LEVEL`

_String_

Log level to use. Allowed values are:

* `debug`
* `info` (default)
* `warn`
* `error`

### `SB_LOG_FORMAT`

_String_

Log format:

* `json` - structured logging in json format (automatically enabled when Selebrow is run in Kubernetes).
* `console` - human-readable console logs (default). Color output is enabled when running in terminal.

### `SB_LOG_OUTPUT`

_String_

Log output file/stream. Default is `stdout`.
