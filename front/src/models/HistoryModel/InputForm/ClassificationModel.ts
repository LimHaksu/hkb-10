import Observable from "../../Observable";

export type TypeClassificaion = "income" | "outcome";

class ClassificationModel extends Observable {
  private classification: TypeClassificaion = "outcome";

  constructor() {
    super();
  }

  setClassifiacation(classification: TypeClassificaion) {
    this.classification = classification;
    this.notify(this.classification);
  }

  initData() {
    this.notify(this.classification);
  }
}

export default new ClassificationModel();
