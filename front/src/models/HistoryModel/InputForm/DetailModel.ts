import Observable from "../../Observable";

class DetailModel extends Observable {
  private detail: string = "";

  constructor() {
    super();
  }

  getDetail() {
    return this.detail;
  }

  setDetail(detail: string) {
    this.detail = detail;
    this.notify(this.detail);
  }

  initData() {
    this.notify(this.detail);
  }
}

export default new DetailModel();
