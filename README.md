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

## Deployment

Pushes to the `main` branch automatically deploy the static site to GitHub Pages
using the workflow in `.github/workflows/deploy.yml`. The generated site uses
the files in the repository root (excluding `node_modules` and GitHub metadata),
so no build step is required; everything referenced by `index.html` is published
directly. Once the workflow finishes, the published site will be available at
`https://<your-username>.github.io/BugetBubbleChart`.
# BugetBubbleChart
