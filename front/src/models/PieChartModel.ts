import Observable from "./Observable";

import RootModel, { Date } from "./RootModel";
import getCategoryOutcome, { CategoryInfo } from "../fetch/getCategoryOutcome";

class PieChartModel extends Observable {
  private pieData: CategoryInfo[] = [];

  constructor() {
    super();

    RootModel.subscribe("pieChart", async (data: Date) => {
      const { year, month } = data;

      const response = await getCategoryOutcome(year, month);
      if (response.success) {
        this.pieData = response.data;
      }

      this.notify(this.pieData);
    });

    this.setData();
  }

  setData() {
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
