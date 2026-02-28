---
sidebar_position: 1
---

# Kubernetes

## Namespace setup

First, create a namespace for the Selebrow service deployment: 
```shell
kubectl create ns selebrow
``` 
You can skip this step by providing the `--create-namespace` flag with the `helm install` command later

By default, Selebrow will create browser pods in its own namespace. However, if you prefer, you can create a separate namespace for the browser pods:
```shell
kubectl create ns browsers
```
When installing the Selebrow Helm chart, pass the `--set selebrow.namespace=browsers` parameter to use a separate namespace.

## Installing the Helm chart

Make sure you have Helm version >= v3.8.0 installed.

You can preview available chart values by running the following command:
```shell
# this will show values for the latest Selebrow version
helm show values oci://ghcr.io/selebrow/helm-charts/selebrow
```

Install the Selebrow chart into the previously created namespace, providing any additional values as needed. For example:
```shell 
# this will install the latest Selebrow version
helm install selebrow oci://ghcr.io/selebrow/helm-charts/selebrow -n selebrow \
  --set ingress.enabled=true \
  --set selebrow.namespace=browsers \
  --set templateValues.browser.env.TZ=America/Chicago
```

Helm chart version corresponds to the Selebrow application version, omitting `v` prefix. So you can install specific Selebrow version by specifying
`--version x.x.x` parameter to Helm. For example to install Selebrow v1.4.0:
```shell 
# this will install the Selebrow version v1.4.0, Chart versions omits v prefix
helm install selebrow oci://ghcr.io/selebrow/helm-charts/selebrow --version 1.4.0 ...
```
