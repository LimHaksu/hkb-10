import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import getDailyOutcomes, { DataType } from "../fetch/getDailyOutcomes";

class CalendarModel extends Observable {
  private dateData: DataType = {
    year: RootModel.getYear(),
    month: RootModel.getMonth(),
    dates: [],
  };

  constructor() {
    super();
    this.dateData.year = RootModel.getYear();
    this.dateData.month = RootModel.getMonth();

    RootModel.subscribe("changeLineGraph", async (data: Date) => {
      this.dateData.year = data.year;
      this.dateData.month = data.month;

      const response = await getDailyOutcomes(data.year, data.month);
      if (response.success) {
        this.dateData.dates = response.data.dates;
      }

      this.notify(this.dateData);
    });
  }
}

export default new CalendarModel();
