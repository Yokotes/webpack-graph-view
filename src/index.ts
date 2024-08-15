import { initGraph } from "./graph";

const main = () => {
  const root = document.querySelector("#root");

  const message = document.createElement("div");

  message.append("Message");

  // root.append(message);

  console.log("Started");

  initGraph(root);
};

main();
