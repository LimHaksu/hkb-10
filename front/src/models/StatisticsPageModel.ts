import Observable from "./Observable";

export enum CASE {
  PIE,
  LINE,
}

class StatisticsPageModel extends Observable {
  private case: CASE;

  constructor() {
    super();
    this.case = CASE.PIE;
  }

  showPie(): void {
    this.case = CASE.PIE;
    this.notify(this.case);
  }

  showLine(): void {
    this.case = CASE.LINE;
    this.notify(this.case);
  }

  getCase() {
    return this.case;
  }
}

export default new StatisticsPageModel();
