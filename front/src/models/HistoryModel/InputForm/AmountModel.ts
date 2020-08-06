import Observable from "../../Observable";

class AmountModel extends Observable {
  private amount: number = 0;

  constructor() {
    super();
  }

  getAmount() {
    return this.amount;
  }

  setAmount(amount: number) {
    this.amount = amount;
    this.notify(this.amount);
  }

  initData() {
    this.notify(this.amount);
  }
}

export default new AmountModel();
