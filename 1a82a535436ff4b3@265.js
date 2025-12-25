import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bubble chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Taiwan 2019 central government budget

This bubble chart summarizes the 2019 Taiwan central government budget by spending category. Bubble size is proportional to the category’s total allocation, and colors distinguish categories.`
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(d3,data)
{
  // Specify the dimensions of the chart.
  const width = 928;
  const height = width;
  const margin = 1; // to avoid clipping the root circle stroke
  const name = d => d.name ?? d.id.split(".").pop();
  const group = d => d.category ?? d.group ?? d.id.split(".")[1] ?? d.id;
  const names = d => String(name(d)).split(/(?=[A-Z][a-z])|\s+/g);

  // Specify the number format for values.
  const format = d3.format(",d");

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10)
    .domain(Array.from(new Set(data.map(group))));

  // Create the pack layout.
  const pack = d3.pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  const root = pack(d3.hierarchy({children: data})
      .sum(d => d.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle");

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll()
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

  // Add a title.
  node.append("title")
      .text(d => `${name(d.data)}\n${format(d.value)}`);

  // Add a filled circle.
  node.append("circle")
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(group(d.data)))
      .attr("r", d => d.r);

  // Add a label.
  const text = node.append("text")
      .attr("clip-path", d => `circle(${d.r})`);

  // Add a tspan for each CamelCase-separated word.
  text.selectAll()
    .data(d => names(d.data))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text(d => d);

  // Add a tspan for the node’s value.
  text.append("tspan")
      .attr("x", 0)
      .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
      .attr("fill-opacity", 0.7)
      .text(d => format(d.value));

  return Object.assign(svg.node(), {scales: {color}});
}


async function _data(FileAttachment,d3){return(
d3.rollups(
  await FileAttachment("budget.csv").csv({typed: true}),
  entries => d3.sum(entries, d => d.amount),
  d => d.cat
).map(([category, value]) => ({
  id: `budget.${category}`,
  name: category,
  category,
  value
})).sort((a, b) => d3.descending(a.value, b.value))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["budget.csv", {url: new URL("./files/tw2019ap.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
