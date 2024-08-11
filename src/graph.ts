// Example from
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

import {
  create,
  drag,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  scaleOrdinal,
  schemeCategory10,
  SimulationNodeDatum,
} from "d3";
import { MOCK_DATA } from "./mockData";

export const initGraph = () => {
  const width = 900;
  const height = 900;

  const color = scaleOrdinal(schemeCategory10);
  const nodes = MOCK_DATA.nodes.map((node) => ({ ...node }));
  const links = MOCK_DATA.links.map((links) => ({ ...links }));

  // Create a simulation with several forces.
  const simulation = forceSimulation(nodes as any)
    .force(
      "link",
      forceLink(links).id((d) => (d as any).id)
    )
    .force("charge", forceManyBody())
    .force("x", forceX())
    .force("y", forceY());

  // Create the SVG container.
  const svg = create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a line for each link, and a circle for each node.
  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 1)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(2));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", (d) => color(d.id));

  node.append("title").text((d) => d.id);

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on("tick", () => {
    link
      .attr("x1", (d) => (d.source as any).x)
      .attr("y1", (d) => (d.source as any).y)
      .attr("x2", (d) => (d.target as any).x)
      .attr("y2", (d) => (d.target as any).y);

    node.attr("cx", (d) => (d as any).x).attr("cy", (d) => (d as any).y);
  });

  console.log("Graph inited");

  return svg.node();
};
