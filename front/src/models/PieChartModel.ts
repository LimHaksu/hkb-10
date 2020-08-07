import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import getCategoryOutcome, { CategoryInfo } from "../fetch/getCategoryOutcome";
import Path from "../router/Path";
import LoginModel from "../models/LoginModel";
import { STATISTICS } from "../router/PathConstants";

class PieChartModel extends Observable {
  private pieData: CategoryInfo[] = [];

  constructor() {
    super();

    RootModel.subscribe("pieChart", async (data: Date) => {
      if (Path.getPath() !== STATISTICS) {
        return;
      }
      const { year, month } = data;
      const userId = LoginModel.getLoggedInUserId();
      const response = await getCategoryOutcome(userId, year, month);
      if (response.success) {
        this.pieData = response.data;
      }

      this.notify(this.pieData);
    });

    Path.subscribe("statisticPieChartModel", (pathName: string) => {
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
    const userId = LoginModel.getLoggedInUserId();
    const year = RootModel.getYear();
    const month = RootModel.getMonth();
    getCategoryOutcome(userId, year, month).then((response) => {
      if (response.success) {
        this.pieData = response.data;
      }

      this.notify(this.pieData);
    });
  }

  customNotify() {
    this.notify(this.pieData);
  }
}

export default new PieChartModel();
