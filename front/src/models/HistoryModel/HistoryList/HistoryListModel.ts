import Observable from "../../Observable";
import fetch, { HistoryDataType } from "../../../fetch";

class HistoryListModel extends Observable {
  private histories: HistoryDataType[] = [];

  constructor() {
    super();
  }

  initData() {
    fetch
      .getHistories(2020, 7)
      .then((histories: HistoryDataType[]) => {
        this.histories = histories;
        this.notify(this.histories);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}

export { HistoryDataType };
export default new HistoryListModel();
