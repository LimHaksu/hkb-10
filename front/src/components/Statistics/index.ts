import Component from "../Component";
import LineGraph from "./LineGraph";

export default class Statistics extends Component {
  $lineGraph: LineGraph;

  constructor() {
    super();

    this.$lineGraph = new LineGraph(800, 600);

    this.view = document.createElement("div");
    this.view.innerText = "statistics";

    this.view.appendChild(this.$lineGraph.view);
  }
}
