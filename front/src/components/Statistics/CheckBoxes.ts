import Component from "../Component";

import StatisticsPageModel, { CASE } from "../../models/StatisticsPageModel";

import "./CheckBoxes.scss";

const checkbox = /* html */ `
<p>카테고리별 지출 <input type="radio" name="display" value="category"/></p>
<p>일별 지출 <input type="radio" name="display" value="daily"/></p>
`;

export default class CheckboxOption extends Component {
  $categoryInput: HTMLInputElement;
  $dailyInput: HTMLInputElement;

  constructor() {
    super();

    this.view = document.createElement("div");
    this.view.className = "checkboxes";

    this.view.innerHTML = checkbox;

    this.$categoryInput =
      this.view.querySelector("[value=category]") ||
      document.createElement("input");
    this.$dailyInput =
      this.view.querySelector("[value=daily]") ||
      document.createElement("input");

    switch (StatisticsPageModel.getCase()) {
      case CASE.LINE: {
        this.$dailyInput.checked = true;
        break;
      }
      case CASE.PIE: {
        this.$categoryInput.checked = true;
        break;
      }
    }

    this.addListeners();
  }

  addListeners(): void {
    this.$categoryInput.addEventListener("click", () => {
      StatisticsPageModel.showPie();
    });

    this.$dailyInput.addEventListener("click", () => {
      StatisticsPageModel.showLine();
    });
  }
}
