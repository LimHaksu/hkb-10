import Observable from "../../Observable";
import RootModel from "../../RootModel";
import Path from "../../../router/Path";
import fetch, { HistoryDataType } from "../../../fetch";

import Path from "../../../router/Path";
import { HISTORY } from "../../../router/PathConstants";

class HistoryListModel extends Observable {
  private histories: HistoryDataType[] = [];
  rootModel: typeof RootModel;
  path: typeof Path;
  constructor() {
    super();

    this.rootModel = RootModel;
    this.path = Path;

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
        if (Path.getPath() !== HISTORY) {
          return;
        }
        this.fetchGetHistories(date.year, date.month);
      }
    );
    Path.subscribe("historyListModelChange", (pathName: string) => {
      if (pathName !== HISTORY) {
        return;
      }
      const year = RootModel.getYear();
      const month = RootModel.getMonth();
      this.fetchGetHistories(year, month);
    });
  }

  initData() {
    if (Path.getPath() !== HISTORY) {
      return;
    }
    const year = this.rootModel.getYear();
    const month = this.rootModel.getMonth();
    this.fetchGetHistories(year, month);
  }
}

export { HistoryDataType };
export default new HistoryListModel();
