import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import Path from "../router/Path";
import LoginModel from "../models/LoginModel";
import { CALENDAR } from "../router/PathConstants";

import getDailyHistories, {
  ApiResponse,
  DateData,
} from "../fetch/getDailyHistories";

class CalendarModel extends Observable {
  private dateData: DateData = {
    year: RootModel.getYear(),
    month: RootModel.getMonth(),
    data: [],
  };

  constructor() {
    super();
    this.dateData.year = RootModel.getYear();
    this.dateData.month = RootModel.getMonth();

    RootModel.subscribe("changeTimeCalendar", (data: Date) => {
      this.dateData.year = data.year;
      this.dateData.month = data.month;

      this.setData();
    });

    Path.subscribe("calendarModel", (pathName: string) => {
      if (pathName !== CALENDAR) {
        return;
      }
      this.setData();
    });

    this.setData();
  }

  setData(): void {
    if (Path.getPath() !== CALENDAR) {
      return;
    }
    const { year, month } = this.dateData;
    const userId = LoginModel.getLoggedInUserId();
    getDailyHistories(userId, year, month)
      .then((response: ApiResponse) => {
        if (response.success) {
          this.dateData.data = response.data.data;
        }

        this.notify(this.dateData);
      })
      .catch(() => {
        this.dateData.data = [];
        this.notify(this.dateData);
      });
  }

  getDateDate() {
    return this.dateData;
  }

  customNotify() {
    this.notify(this.dateData);
  }
}

export default new CalendarModel();
