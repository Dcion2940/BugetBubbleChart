import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bubble chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Bubble chart

Bubble charts are non-hierarchical [packed circles](/@d3/pack/2). Click a bubble to drill down to its children; click the background (or the central circle) to go back up. The color for each branch stays consistent as you navigate through the levels.`
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(d3,data)
{
  // Specify the dimensions of the chart.
  const width = 928;
  const height = width;
  const margin = 4; // small inset to avoid clipping
  const format = d3.format(",d");
  const labelFromId = (id) => id.split(".").pop();

  // Build a stratified hierarchy from the flat CSV.
  const stratify = d3.stratify()
    .id(d => d.id)
    .parentId(d => {
      const i = d.id.lastIndexOf(".");
      return i >= 0 ? d.id.slice(0, i) : null;
    });

  // Compute the hierarchy and store the packed layout on the root.
  const root = stratify(data)
    .sum(d => d.value || 0)
    .sort((a, b) => d3.descending(a.value, b.value));

  const pack = d3.pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(3);

  pack(root);

  // Color is keyed by the top-level ancestor so each branch keeps the same color.
  const color = d3.scaleOrdinal(d3.schemeTableau10);
  const colorKey = new Map();
  root.each(d => {
    const top = d.ancestors().find(node => node.depth === 1);
    const key = top ? top.id : d.id;
    colorKey.set(d.id, key);
  });
  color.domain([...new Set(colorKey.values())]);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-margin, -margin, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
    .attr("text-anchor", "middle");

  const g = svg.append("g");

  const breadcrumb = svg.append("text")
    .attr("x", width / 2)
    .attr("y", 20 - margin)
    .attr("fill", "#555")
    .attr("font-size", 12)
    .attr("text-anchor", "middle");

  let focus = root;
  update(focus);

  // Allow clicking the background to move up a level (if possible).
  svg.on("click", () => {
    if (focus.parent) {
      update(focus.parent);
    }
  });

  function update(newFocus) {
    focus = newFocus;
    const layout = pack(newFocus.copy());
    const nodes = layout.children || [];

    breadcrumb.text(focus.ancestors().map(d => labelFromId(d.id)).reverse().join(" / "));

    const node = g.selectAll("g.node")
      .data(nodes, d => d.id);

    const nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodeEnter.append("title");

    nodeEnter.append("circle")
      .attr("fill-opacity", 0.7)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    nodeEnter.append("text")
      .attr("dy", "0.35em")
      .attr("font-size", d => `${Math.max(10, Math.min(20, d.r / 2.5))}px`)
      .attr("pointer-events", "none");

    const merged = nodeEnter.merge(node);

    merged.transition().duration(500)
      .attr("transform", d => `translate(${d.x},${d.y})`);

    merged.select("circle")
      .attr("cursor", d => (d.children ? "pointer" : "default"))
      .on("click", function(event, d) {
        if (!d.children) return;
        event.stopPropagation();
        update(d);
      })
      .transition().duration(500)
      .attr("r", d => d.r)
      .attr("fill", d => color(colorKey.get(d.id)));

    merged.select("text")
      .text(d => labelFromId(d.id))
      .attr("font-size", d => `${Math.max(10, Math.min(20, d.r / 2.5))}px`)
      .attr("opacity", d => (d.r > 18 ? 1 : 0));

    merged.select("title")
      .text(d => `${d.id}\n${format(d.value)}`);

    node.exit().transition().duration(300)
      .attr("opacity", 0)
      .remove();
  }

  return Object.assign(svg.node(), {scales: {color}});
}


async function _data(FileAttachment){return(
(await FileAttachment("tw2019ap.csv").csv({typed: true})).filter(({value}) => value !== null)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tw2019ap.csv", {url: new URL("./files/tw2019ap.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
