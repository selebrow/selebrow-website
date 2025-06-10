---
sidebar_position: 2
---

# GitLab CI

## Requirements

* GitLab version 15 or later
* GitLab [Kubernetes executor](https://docs.gitlab.com/runner/executors/kubernetes/) version 15 or later

## Service account and namespace setup

The Selebrow service requires permissions to create browser pods. These permissions must be given to a service account which is set for build pods. It's a good idea to have separate service accounts and namespaces created for this purpose:
```shell
kubectl create sa selebrow -n <GITLAB_NAMESPACE> 
kubectl create ns browsers
```
`GITLAB_NAMESPACE` - The Kubernetes namespace where your GitLab Runner is installed.

Next you need a `Role` and a `RoleBinding` for the ServiceAccount you have created. Save the manifest below to the `selebrow.yaml` file:
<details>
<summary>Kubernetes manifest</summary>

```yaml title="selebrow.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: selebrow
rules:
  - apiGroups:
      - ""
    resources:
      - pods
    verbs:
      - create
      - get
      - list
      - watch
      - delete
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: selebrow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: selebrow
subjects:
  - apiGroup: ""
    kind: ServiceAccount
    name: browsers
    namespace: <GITLAB_NAMESPACE>
```
</details>

Replace `<GITLAB_RUNNER_NAMESPACE>` with your GitLab runner's namespace name, then apply the manifest to the newly created `browsers` namespace:
```shell
kubectl apply -f selebrow.yaml -n browsers
```

## Job template

Selebrow is meant to run as a [GitLab Service](https://docs.gitlab.com/ci/services/), so we recommend to define and use separate job template:
```yaml
.selebrow:
  services:
    - ghcr.io/selebrow/selebrow
  variables:
    KUBERNETES_SERVICE_ACCOUNT_OVERWRITE: selebrow
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1"
```

Here `KUBERNETES_SERVICE_ACCOUNT_OVERWRITE` is used to run the job under a separate service account we created earlier,
see [GitLab documentation](https://docs.gitlab.com/runner/executors/kubernetes/#overwrite-the-kubernetes-default-service-account) for further details. Use the `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` env to disable unnecessary browser binary downloads by Playwright.

Once the template is defined you can use it in your actual e2e test job. An example for Playwright tests:
```yaml
e2e-tests:
  extends: .selebrow
  image: node:22
  before_script:
    - npm install
  script:
    - npx playwright test
```
