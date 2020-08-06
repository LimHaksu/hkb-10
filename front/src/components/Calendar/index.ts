import Component from "../Component";
import Calendar from "./Calendar";
import Checkboxes from "./Checkboxes";

import CalendarCheckboxModel from "../../models/CalendarCheckboxModel";
import RootModel from "../../models/RootModel";

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
  }
}
