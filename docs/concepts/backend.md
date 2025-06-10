---
sidebar_position: 0
---

# Backend

Selebrow utilizes various runtime environments to manage browser containers, these environments are referred to as "backends". 
You can specify which backend to use by setting the [backend](../configuration/parameters.md#backend) parameter.
By default Selebrow tries to identify the most suitable backend for your setup.

## Docker

When the Docker backend is enabled every browser request starts a new Docker container (unless [pooling](pooling.md) is enabled).
For detailed configuration options, please refer to the [Docker parameters reference](../configuration/parameters.md#docker-parameters).

### Network and port mapping

If Selebrow is started on the host machine it communicates with the browser containers by [publishing ephemeral ports](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/#publishing-to-ephemeral-ports).
This mode is referred to as port mapping mode; see the [docker-port-mapping parameter](../configuration/parameters.md#docker-port-mapping) description for specific details.

If you run Selebrow within a Docker container it communicates directly with the browser containers and must  
be connected to the configured [Docker network](../configuration/parameters.md#docker-network). If you do not specify 
the Docker network explicitly, Selebrow will try to detect its network by inspecting its own Docker container.

## Kubernetes

When the Kubernetes backend is enabled each browser request starts a new Kubernetes pod, unless [pooling](pooling.md) is enabled.
For detailed configuration options, please refer to the [Kubernetes parameters reference](../configuration/parameters.md#kubernetes-parameters).

### Pod template

The browser Pod manifest is generated using the configured Pod template.
This process is akin to [Helm chart templates](https://helm.sh/), but here a single template file is used ([pod-template.yaml](../configuration/templates.md#pod-templateyaml)) which is rendered using values from [values.yaml](../configuration/templates.md#valuesyaml) each time a new browser pod is launched.
This approach offers the flexibility to customize the browser pod to suit your needs, such as adding metadata, volumes, or sidecar containers.
For more information, please see the [templates reference](../configuration/templates.md).

### In Cluster mode

If the Selebrow service itself is started inside a Kubernetes Pod (which is recommended) it expects that its Pod has mounted a ServiceAccount's API credentials. These credentials must have the following permissions for the `pods` resources:

```
- create
- get
- list
- watch
- delete
```

In this mode Selebrow communicates directly to browser Pod IPs and ports over the Kubernetes network.

### Out of cluster mode

For debugging purposes you may want to start Selebrow service outside the Kubernetes cluster.
This mode can be enabled using the [kube-cluster-mode-out parameter](../configuration/parameters.md#kube-cluster-mode-out). 
In this case you need to have a [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) with access to the namespace where you want Selebrow to create browser pods. This mode is not recommended for production use because of unreliable Kubernetes Pod port forwarding, which is used to communicate with browser Pods. 
