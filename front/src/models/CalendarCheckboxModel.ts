import Observable from "./Observable";

class CalendarCheckboxModel extends Observable {
  private showIncome: boolean;
  private showOutcome: boolean;

  constructor() {
    super();
    this.showIncome = true;
    this.showOutcome = true;
  }

  changeIncome(value: boolean): void {
    this.showIncome = value;

    const data = {
      income: this.showIncome,
      outcome: this.showOutcome,
    };
    this.notify(data);
  }

  changeOutcome(value: boolean): void {
    this.showOutcome = value;

    const data = {
      income: this.showIncome,
      outcome: this.showOutcome,
    };
    this.notify(data);
  }
}

export default new CalendarCheckboxModel();
