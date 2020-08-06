import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import getCategoryOutcome, { CategoryInfo } from "../fetch/getCategoryOutcome";
import Path from "../router/Path";

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

      const response = await getCategoryOutcome(year, month);
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
    const year = RootModel.getYear();
    const month = RootModel.getMonth();

    getCategoryOutcome(year, month).then((response) => {
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
