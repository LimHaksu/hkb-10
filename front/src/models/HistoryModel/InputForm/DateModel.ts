import Observable from "../../Observable";

class DateModel extends Observable {
  private date: Date = new Date(Date.now());

  constructor() {
    super();
  }

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
    this.notify(this.date);
  }

  initData() {
    this.notify(this.date);
  }
}

export default new DateModel();
