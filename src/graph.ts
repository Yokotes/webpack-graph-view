const { default: ForceGraph } = require("force-graph");

export const initGraph = (root: Element) => {
  const N = 10;
  const gData = {
    nodes: [...Array(N).keys()].map((i) => ({
      id: i,
      name: i,
      val: i,
      color: "red",
    })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };

  const Graph = ForceGraph()(document.getElementById("root")).graphData(gData);

  console.log(ForceGraph);
  console.log("init graph");
};
