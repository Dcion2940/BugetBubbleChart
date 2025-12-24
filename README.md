# Bubble chart

https://observablehq.com/@d3/bubble-chart/2@265

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/1a82a535436ff4b3@265.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@d3/bubble-chart/2";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
# BugetBubbleChart

## Deploying to GitHub Pages

This repository includes a GitHub Actions workflow that publishes the static site to GitHub Pages.

1. In GitHub, go to **Settings → Pages** and ensure **Build and deployment** is set to **GitHub Actions**.
2. Push changes to `main` (or `master`). The workflow at `.github/workflows/deploy.yml` will:
   - Check out the repository.
   - Package the static site content (excluding `node_modules`, `.git*`, and workflow files).
   - Upload the artifact and deploy it to GitHub Pages.
3. After the workflow finishes, the published site URL will appear in the workflow summary and under **Settings → Pages**.
