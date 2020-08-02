import Observable from "../../Observable";

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
    this.notify(this.isChecked);
  }
}

export { TypeCheckbox };
export default new Checkbox();
