import Component from "../Component";
import Calendar from "./Calendar";
import Checkboxes from "./Checkboxes";

import CalendarCheckboxModel from "../../models/CalendarCheckboxModel";

const url = "http://localhost:3000";

type dayInfo = {
  day: number;
  income: number;
  outcome: number;
};

type apiResponse = {
  success: boolean;
  data: {
    year: number;
    month: number;
    data: dayInfo[];
  };
};

export default class CalendarPage extends Component {
  $checkboxes: Checkboxes;
  $calendar: Calendar;
  year: number;
  month: number;

  constructor() {
    super();
    this.$checkboxes = new Checkboxes();

    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;

    this.view = document.createElement("div");
    this.view.id = "calendar";
    this.view.className = "calendar";

    this.view.appendChild(this.$checkboxes.view);

    this.$calendar = new Calendar();
    this.appendChild(this.$calendar);

    CalendarCheckboxModel.subscribe(
      "changeShow",
      (data: { income: boolean; outcome: boolean }) => {
        this.$calendar.hideContent(data.income, data.outcome);
      }
    );

    this.fetchData();
  }

  fetchData(): void {
    fetch(`${url}/api/histories/daily/1/1`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: apiResponse) => {
        if (res.success) {
          this.$calendar.setData(res.data.data);

          let income = 0;
          let outcome = 0;
          res.data.data.forEach((cur) => {
            if (cur.income) {
              income += cur.income;
            }
            if (cur.outcome) {
              outcome += cur.outcome;
            }
          });
          this.$checkboxes.changeCost(income, outcome);
        }
      });
  }
}
