import Component from "../Component";
import Calendar from "./Calendar";
import Checkboxes from "./Checkboxes";

import CalendarCheckboxModel from "../../models/CalendarCheckboxModel";
import CalendarModel from "../../models/CalendarModel";
import RootModel from "../../models/RootModel";

import getDailyHistories, {
  ApiResponse,
  DateData,
  DateInfo,
} from "../../fetch/getDailyHistories";

export default class CalendarPage extends Component {
  $checkboxes: Checkboxes;
  $calendar: Calendar;
  year: number;
  month: number;

  constructor() {
    super();
    this.year = RootModel.getYear();
    this.month = RootModel.getMonth() + 1;

    this.$checkboxes = new Checkboxes();

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

    CalendarModel.subscribe("changeDate", (data: DateData) => {
      this.fetchData(data.year, data.month);
    });

    this.fetchData(RootModel.getYear(), RootModel.getMonth());
  }

  fetchData(year: number, month: number): void {
    getDailyHistories(year, month).then((response: ApiResponse) => {
      if (response.success) {
        this.$calendar.setData(response.data.data);

        let income = 0;
        let outcome = 0;
        response.data.data.forEach((cur: DateInfo) => {
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

  reRender(): void {
    this.fetchData(RootModel.getYear(), RootModel.getMonth());
  }
}
