import Observable from "../../Observable";

class EditFlagModel extends Observable {
  private isEditMode: boolean = false;

  constructor() {
    super();
  }

  getEditMode() {
    return this.isEditMode;
  }

  setEditMode(isEditMode: boolean) {
    this.isEditMode = isEditMode;
    this.notify(this.isEditMode);
  }

  initData() {
    this.notify(this.isEditMode);
  }
}

export default new EditFlagModel();
