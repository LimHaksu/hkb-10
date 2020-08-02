import Observable from "../../Observable";

export type TypeClassificaion = "income" | "outcome";

class ClassificationModel extends Observable {
  private classification: TypeClassificaion = "outcome";

  constructor() {
    super();
  }

  changeClassifiacation() {
    if (this.classification === "income") {
      this.classification = "outcome";
    } else {
      this.classification = "income";
    }
    this.notify(this.classification);
  }

  initData() {
    this.notify(this.classification);
  }
}

export default new ClassificationModel();
