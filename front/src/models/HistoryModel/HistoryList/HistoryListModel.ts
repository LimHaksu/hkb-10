import Observable from "../../Observable";
import fetch, { HistoryDataType } from "../../../fetch";
import CheckboxModel, { TypeCheckbox } from "../Checkbox/CheckboxModel";

class HistoryListModel extends Observable {
  private checkbox: typeof CheckboxModel;
  private historiesOriginal: HistoryDataType[] = [];
  private historiesForView: HistoryDataType[] = [];

  constructor() {
    super();

    this.checkbox = CheckboxModel;

    this.subscribeModels();
  }

  subscribeModels() {
    this.checkbox.subscribe(
      "subCheckboxInHistoryModel",
      (checkbox: TypeCheckbox) => {
        this.historiesForView = this.historiesOriginal.filter((history) => {
          if (history.income) {
            if (checkbox.income) {
              return true;
            } else {
              return false;
            }
          } else {
            if (checkbox.outcome) {
              return true;
            } else {
              return false;
            }
          }
        });
        this.notify(this.historiesForView);
      }
    );
  }

  initData() {
    fetch
      .getHistories(2020, 7)
      .then((histories: HistoryDataType[]) => {
        this.historiesOriginal = histories;
        this.historiesForView = histories;
        this.notify(this.historiesForView);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}

export { HistoryDataType };
export default new HistoryListModel();
