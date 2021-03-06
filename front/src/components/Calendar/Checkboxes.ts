import Component from "../Component";
import "./Checkboxes.scss";

import CalendarCheckboxModel from "../../models/CalendarCheckboxModel";
import CalendarModel from "../../models/CalendarModel";

import { DateData } from "../../fetch/getDailyHistories";

const checkbox = /* html */ `
<div class="check"><input type="checkbox" name="income" checked><p>수입</p> <p class="income">0</p></div>
<div class="check"><input type="checkbox" name="outcome" checked><p>지출</p> <p class="outcome">0</p></div>
`;

export default class CheckboxOption extends Component {
  $incomeText: HTMLParagraphElement;
  $outcomeText: HTMLParagraphElement;
  $incomeCheck: HTMLInputElement;
  $outcomeCheck: HTMLInputElement;

  constructor() {
    super();

    this.view = document.createElement("div");
    this.view.className = "checkboxes";

    this.view.innerHTML = checkbox;

    this.$incomeText =
      this.view.querySelector(".income") || document.createElement("p");
    this.$outcomeText =
      this.view.querySelector(".outcome") || document.createElement("p");

    this.$incomeCheck =
      this.view.querySelector("input[name=income]") ||
      document.createElement("input");
    this.$outcomeCheck =
      this.view.querySelector("input[name=outcome]") ||
      document.createElement("input");

    CalendarModel.subscribe("changeIncomeOutcome", (data: DateData) => {
      const values = data.data.reduce(
        (pre, cur) => {
          return {
            income: pre.income + (cur.income || 0),
            outcome: pre.outcome + (cur.outcome || 0),
          };
        },
        { income: 0, outcome: 0 }
      );
      this.changeCost(values.income, values.outcome);
    });

    this.addListeners();
  }

  changeCost(income: number, outcome: number): void {
    if (this.$incomeText) {
      this.$incomeText.textContent = `${income}`;
    }
    if (this.$outcomeText) {
      this.$outcomeText.textContent = `${outcome}`;
    }
  }

  addListeners(): void {
    this.$incomeCheck.addEventListener("click", () => {
      CalendarCheckboxModel.changeIncome(this.$incomeCheck.checked);
    });

    this.$outcomeCheck.addEventListener("click", () => {
      CalendarCheckboxModel.changeOutcome(this.$outcomeCheck.checked);
    });
  }
}
