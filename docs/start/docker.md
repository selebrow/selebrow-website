---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

## System requirements and Runtime setup

<Tabs groupId="operating-systems">

<TabItem value="mac" label="macOS">

Supported OS: macOS Big Sur (version 11) or later

Supported and tested Container Runtimes: [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Colima](https://github.com/abiosoft/colima), [OrbStack](https://orbstack.dev/) 
and [Podman Desktop](https://podman-desktop.io/).

For Apple Silicon (M1/M2/M3) devices, you need to install and enable amd64 emulation using Rosetta 2. Run the following command in your terminal:
```shell
 softwareupdate --install-rosetta
```

Next, navigate to Docker Desktop → Preferences and make sure the option `Use Rosetta for x86_64/amd64 emulation on Apple Silicon` found on the General tab is enabled.

If you are using Colima, it must be started with `--arch aarch64 --vm-type=vz --vz-rosetta` options. E.g.:
```shell
colima start --cpu 6 --memory 8 --disk 100 --mount $HOME:w --arch aarch64 --vm-type=vz --vz-rosetta 
```

If you see a `'virtual machine type' cannot be updated after initial setup, discarded` warning when starting Colima, 
you will need to delete the Colima profile and start again with the options above:
```shell
colima delete
```

OrbStack enables Rosetta support by default, please refer to the [documentation](https://docs.orbstack.dev/settings#use-rosetta-to-run-intel-code) for more information.

Podman Desktop also enables [Rosetta support](https://podman-desktop.io/docs/podman/rosetta) by default, additionally you need to enable [Docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/managing-docker-compatibility). 

</TabItem>

<TabItem value="win" label="Windows">

Supported OS: Windows 10 (Build 19041 and higher) or Windows 11 with [WSL installed](https://learn.microsoft.com/en-us/windows/wsl/install)

Supported and tested Container Runtimes: [Docker Desktop](https://www.docker.com/products/docker-desktop/) with [WSL2 backend](https://docs.docker.com/desktop/features/wsl/) 
and [Podman Desktop](https://podman-desktop.io/) with [Docker compatibility](https://podman-desktop.io/docs/migrating-from-docker/managing-docker-compatibility) enabled

</TabItem>

<TabItem value="linux" label="Linux">

Selebrow has been tested only against the [Docker engine](https://docs.docker.com/engine/install/) runtime on Intel-based Linux platforms and no special setup is required.

</TabItem>

</Tabs>

## Install

### From GitHub Releases

Download the Selebrow binary for your OS/Platform from the [Releases page](https://github.com/selebrow/selebrow/releases).
We recommend always using the latest release.

<Tabs groupId="operating-systems">

<TabItem value="mac" label="macOS">

Grant executable permissions to the downloaded file 
and place it in a directory that is included in your `$PATH`:

```shell
# macOS intel
chmod a+x selebrow-darwin-amd64
mv selebrow-darwin-amd64 /usr/local/bin/selebrow

# macOS Apple silicon
chmod a+x selebrow-darwin-arm64
mv selebrow-darwin-arm64 /usr/local/bin/selebrow
```

Additionally, you may need to remove the `com.apple.quarantine` file attribute to avoid Gatekeeper from blocking the execution of Selebrow:
```shell
xattr -d com.apple.quarantine /usr/local/bin/selebrow
```

</TabItem>

<TabItem value="win" label="Windows">

Create a folder for Selebrow and move the downloaded file to the newly created folder

</TabItem>

<TabItem value="linux" label="Linux">

Grant executable permissions to the downloaded file
and place it in a directory that is included in your `$PATH`:

```shell
# linux amd64
chmod a+x selebrow-linux-amd64
mv selebrow-linux-amd64 /usr/local/bin/selebrow
```

</TabItem>

</Tabs>

### Using OS Package manager

<Tabs groupId="operating-systems">

<TabItem value="mac" label="macOS">

TODO

</TabItem>

<TabItem value="win" label="Windows">

TODO

</TabItem>

<TabItem value="linux" label="Linux">

TODO

</TabItem>

</Tabs>

## Run

Run the following command from you favorite terminal:
```shell
selebrow
```
