---
sidebar_position: 0
---

# Introduction

Selebrow is an open-source tool that simplifies running UI tests with WebDriver-based frameworks like
[Selenium](https://www.selenium.dev/), [Selenide](https://selenide.org/), [WebdriverIO](https://webdriver.io/) (wdio), and [Playwright](https://playwright.dev/).


It can serve as a drop-in replacement for the discontinued [Selenoid](https://github.com/aerokube/selenoid) project allowing running browsers in Docker containers or 
Kubernetes pods.

Selebrow allows running tests in multiple browsers concurrently using prebuilt [browser images](./concepts/images.md), 
ensuring reliable results both locally and in CI.

## Key features compared to Selenoid

* [Kubernetes backend](concepts/backend.md#kubernetes) support
* Ability to run as [GitLab CI service](./start/gitlab-ci.md)
* Support for running [Playwright tests](usage/playwright/playwright.md)
* [Browser pooling](concepts/pooling.md) for faster tests startup
* [UI](concepts/ui.md) integrated directly into binary, no separate components required
