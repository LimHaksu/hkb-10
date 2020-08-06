import Observable from "../../Observable";

class SelectedHistoryModel extends Observable {
  private selectedHistoryId: number = 0;

  constructor() {
    super();
  }

  getSelectedHistoryId() {
    return this.selectedHistoryId;
  }

  setSelectedHistoryId(id: number) {
    this.selectedHistoryId = id;
    this.notify(this.selectedHistoryId);
  }
}

export default new SelectedHistoryModel();
