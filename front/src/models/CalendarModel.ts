import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";

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

    RootModel.subscribe("changeTimeCalendar", async (data: Date) => {
      this.dateData.year = data.year;
      this.dateData.month = data.month;

      await this.fetchData(data.year, data.month);

      this.notify(this.dateData);
    });

    this.fetchData(this.dateData.year, this.dateData.month);
  }

  fetchData(year: number, month: number): void {
    getDailyHistories(year, month).then((response: ApiResponse) => {
      if (response.success) {
        this.dateData.data = response.data.data;
      }
    });
  }

  getDateDate() {
    return this.dateData;
  }
}

export default new CalendarModel();
