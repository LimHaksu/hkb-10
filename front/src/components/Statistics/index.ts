import Component from "../Component";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import StickGraph from "./StickGraph";
import Checkboxes from "./CheckBoxes";

import StatisticsPageModel, { CASE } from "../../models/StatisticsPageModel";

export default class Statistics extends Component {
  $lineGraph: LineGraph;
  $pieChart: PieChart;
  $stickGraph: StickGraph;
  $checkboxes: Checkboxes;

  constructor() {
    super();

    this.$lineGraph = new LineGraph(800, 600);
    this.$pieChart = new PieChart(800, 600);
    this.$stickGraph = new StickGraph(800, 600);
    this.$checkboxes = new Checkboxes();

    this.view = document.createElement("div");
    this.view.innerText = "statistics";
    this.view.appendChild(this.$checkboxes.view);

    switch (StatisticsPageModel.getCase()) {
      case CASE.LINE: {
        this.view.appendChild(this.$lineGraph.view);
        break;
      }
      case CASE.PIE: {
        this.view.appendChild(this.$pieChart.view);
        this.view.appendChild(this.$stickGraph.view);
        break;
      }
    }

    StatisticsPageModel.subscribe("changeCase", (data: CASE) => {
      switch (data) {
        case CASE.LINE: {
          this.view.removeChild(this.$pieChart.view);
          this.view.removeChild(this.$stickGraph.view);
          this.view.appendChild(this.$lineGraph.view);
          this.$lineGraph.reRender();
          break;
        }
        case CASE.PIE: {
          this.view.removeChild(this.$lineGraph.view);
          this.view.appendChild(this.$pieChart.view);
          this.view.appendChild(this.$stickGraph.view);

          this.$pieChart.reRender();
          this.$stickGraph.reRender();

          break;
        }
      }
    });
  }

  reRender(): void {
    this.$lineGraph.reRender();
    this.$pieChart.reRender();
  }
}
