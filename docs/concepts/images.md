# Images

Selebrow uses prebuilt Docker images to run browsers. Images provided by Selebrow Project are available at the 
GitHub [container registry](https://github.com/orgs/selebrow/packages?ecosystem=container).
Source code (Dockerfiles) is in [selebrow/images](https://github.com/selebrow/images) repository.

## Updates

New images are automatically built as soon as new Chrome/Firefox or Playwright version becomes available. When the new images are released, 
[default browser catalog](https://selebrow.dev/browsers.yaml) is also updated (requires Selebrow restart to pick up the changes).

## Alternative images
Selebrow is also backward-compatible with the following browser images:
* [Aerokube selenoid images](https://hub.docker.com/u/selenoid) ([source](https://github.com/aerokube/images)) - currently abandoned and not getting updated
* [twilio selenoid-images](https://hub.docker.com/r/twilio/selenoid) ([source](https://github.com/twilio/selenoid-images)) - maintained fork of original Aerokube selenoid images
