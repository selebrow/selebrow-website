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
helm show values oci://ghcr.io/selebrow/helm-charts/selebrow:v1.0.7
```

Install the Selebrow chart into the previously created namespace, providing any additional values as needed. For example:
```shell 
helm install selebrow oci://ghcr.io/selebrow/helm-charts/selebrow:v1.0.7 -n selebrow \
  --set ingress.enabled=true \
  --set selebrow.namespace=browsers \
  --set templateValues.browser.env.TZ=America/Chicago
```
