---
sidebar_position: 1
title: Templates
toc_max_heading_level: 4
---

Selebrow templates use the Go [text/template](https://pkg.go.dev/text/template) syntax.
Additionally, all [Sprig functions](https://masterminds.github.io/sprig/) are freely available to use in templates.

Default template files are in the `config/` directory. See also [kube-templates-path](parameters.md#kube-templates-path) parameter description

## values.yaml

Must be a map with static values which will then be available as `.Values.*` in the Pod template. This is a very similar concept to
Helm [values files](https://helm.sh/docs/chart_template_guide/values_files/)

## pod-template.yaml

The result of rendering this template must be a valid Yaml/Json [Pod](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/) manifest
with at least one container representing the browser container.

Multiple variables are available in the Pod template: 

###  `.Values.*`

Every value `X` defined in [values.yaml](#valuesyaml) is available in the template as `.Values.X`.

### `.Browser.*`

These values are extracted from the [Browser catalog](browsers.md) for requested browser/version.

#### `Image`

_String_

Browser image reference including tag. See [image](browsers.md#image)

#### `Cmd`

_Array of Strings_

Container command line. See [cmd](browsers.md#cmd)

#### `Ports`

_Map String → Integer_

The map of container ports to be exposed. See [ports](browsers.md#ports)

#### `Path`

_String_

HTTP request path prefix. See [path](browsers.md#path)

#### `Env`

_Map String → String_

Static environment variables. See [env](browsers.md#env)

#### `Limits`

_Map String → [Kubernetes quantity](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes)_

Resource limits for browser container. See [limits](browsers.md#limits)

### `.Options.*`

These values are taken from Webdriver Capability or Playwright request parameters

#### `Env`

_Map String → String_

Requested additional environment variables. The variables below are always added with values parsed from capabilities:
```yaml
ENABLE_VNC: "true"                 # corresponds to VNCEnabled 
SCREEN_RESOLUTION: "1920x1080x24"  # corresponds to Resolution
```

#### `VNCEnabled`

_Boolean_

Indicates whether VNC was enabled in the browser request.

#### `Resolution`

_String_

Screen resolution for X Server (applies only to headed browser requests). Value format is `WIDTHxHEIGHTxBPP`.
Example: `1920x1080x24`

#### `Labels`

_Map String → String_

Pod metadata labels from request.

#### `Hosts`

_Map String → Array of Strings_

IP to host alias map to be used in Pod's [hostAliases](https://kubernetes.io/docs/tasks/network/customize-hosts-file-for-pods/#adding-additional-entries-with-hostaliases)
based on host aliases from the browser request.
```yaml
"10.1.2.3":
  - "foo.remote"
  - "bar.remote"
```

### `.CIEnvironment.*`

These variables are available when Selebrow is run as a Gitlab CI service:

See also: [Predefined CI/CD variables reference](https://docs.gitlab.com/ci/variables/predefined_variables/)

#### `JobID`

_String_

The value of `CI_JOB_ID` environment variable.

#### `ProjectNamespace`

_String_

The value of `CI_PROJECT_NAMESPACE` environment variable.

#### `ProjectName`

_String_

The value of `CI_PROJECT_NAME` environment variable.
