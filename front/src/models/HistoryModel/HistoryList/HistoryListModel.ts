import Observable from "../../Observable";
import RootModel from "../../RootModel";
import fetch, { HistoryDataType } from "../../../fetch";

class HistoryListModel extends Observable {
  private histories: HistoryDataType[] = [];
  rootModel: typeof RootModel;
  constructor() {
    super();

    this.rootModel = RootModel;

    this.subscribeModels();
  }

  fetchGetHistories(year: number, month: number) {
    fetch
      .getHistories(year, month)
      .then((histories: HistoryDataType[]) => {
        this.histories = histories;
        this.notify(this.histories);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  subscribeModels() {
    this.rootModel.subscribe(
      "subRootInHistoryListModel",
      (date: { year: number; month: number }) => {
        this.fetchGetHistories(date.year, date.month);
      }
    );
  }

  initData() {
    const year = this.rootModel.getYear();
    const month = this.rootModel.getMonth();
    this.fetchGetHistories(year, month);
  }
}

export { HistoryDataType };
export default new HistoryListModel();
