import Component from "../Component";

import RootModel from "../../models/RootModel";

import "./ChangeMonth.scss";

const month = `<button class="prev">◁</button>
<p class="month"></p>
<button class="next">▷</button>`;

export default class ChangeMonth extends Component {
  private $prevButton: HTMLButtonElement;
  private $nextButton: HTMLButtonElement;
  private $month: HTMLParagraphElement;

  constructor() {
    super();

    this.view = document.createElement("div");
    this.view.className = "month";
    this.view.innerHTML = month;

    this.$prevButton =
      this.view.querySelector("button.prev") ||
      document.createElement("button");
    this.$nextButton =
      this.view.querySelector("button.next") ||
      document.createElement("button");

    this.$month =
      this.view.querySelector("p.month") || document.createElement("p");

    this.changeMonthText(RootModel.getMonth());
    this.addListeners();
    this.subscribes();
  }

  private addListeners() {
    this.$prevButton.addEventListener("click", () => {
      RootModel.prevMonth();
    });

    this.$nextButton.addEventListener("click", () => {
      RootModel.nextMonth();
    });
  }

  private subscribes() {
    RootModel.subscribe(
      "changeMonthParam",
      (data: { year: number; month: number }) => {
        this.changeMonthText(data.month);
      }
    );
  }

  private changeMonthText(month: number) {
    this.$month.textContent = `${month}`;
  }
}
