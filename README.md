# Taiwan budget bubble chart

This project renders a bubble chart of the 2019 Taiwan central government budget by spending category. It is based on the Observable [bubble chart](https://observablehq.com/@d3/bubble-chart/2@265) notebook and uses D3 to calculate the packed layout.

View the chart in your browser by running a web server in this folder. For example:

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

## Data

The data file [`files/tw2019ap.csv`](files/tw2019ap.csv) contains 2019 appropriations with columns for spending category (`cat`) and amount. The chart aggregates totals by category and uses the sum to size each bubble.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow that publishes the site to GitHub Pages:

- The workflow runs on pushes to the `main` branch or when manually dispatched.
- It uploads the repository contents as a Pages artifact and deploys them using `actions/deploy-pages`.
- Ensure GitHub Pages is enabled for the repository and that Actions are permitted to deploy to the Pages environment.
