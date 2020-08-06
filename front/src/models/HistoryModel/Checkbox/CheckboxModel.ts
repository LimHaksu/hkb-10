import Observable from "../../Observable";

import Path from "../../../router/Path";
import { HISTORY } from "../../../router/PathConstants";

interface TypeCheckbox {
  income: boolean;
  outcome: boolean;
}

class Checkbox extends Observable {
  private isChecked: TypeCheckbox = { income: true, outcome: true };

  constructor() {
    super();
  }

  setIsIncomeChecked(check: boolean) {
    this.isChecked.income = check;
    this.notify(this.isChecked);
  }

  setIsOutcomeChecked(check: boolean) {
    this.isChecked.outcome = check;
    this.notify(this.isChecked);
  }

  initData() {
    if (Path.getPath() !== HISTORY) {
      return;
    }
    this.notify(this.isChecked);
  }
}

export { TypeCheckbox };
export default new Checkbox();
