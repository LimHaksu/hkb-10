import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import getDailyOutcomes, { DataType } from "../fetch/getDailyOutcomes";
import Path from "../router/Path";

import { STATISTICS } from "../router/PathConstants";

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
      if (Path.getPath() !== STATISTICS) {
        return;
      }

      this.dateData.year = data.year;
      this.dateData.month = data.month;

      const response = await getDailyOutcomes(data.year, data.month);
      if (response.success) {
        this.dateData.dates = response.data.dates;
        this.notify(this.dateData);
      } else {
        this.dateData.dates = [];
        this.notify(this.dateData);
      }
    });

    Path.subscribe("statisticLineGraphModel", (pathName: string) => {
      if (pathName !== STATISTICS) {
        return;
      }
      this.setData();
    });
  }

  setData() {
    if (Path.getPath() !== STATISTICS) {
      return;
    }
    getDailyOutcomes(this.dateData.year, this.dateData.month).then(
      (response) => {
        if (response.success) {
          this.dateData.dates = response.data.dates;
          this.notify(this.dateData);
        } else {
          this.dateData.dates = [];
          this.notify(this.dateData);
        }
      }
    );
  }

  customNotify() {
    this.notify(this.dateData);
  }
}

export default new CalendarModel();
