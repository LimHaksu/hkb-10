import Observable from "../../Observable";
import { SelectOption } from "../";

class SelectedCategoryModel extends Observable {
  private selectedCategory: SelectOption = {
    id: 0,
    textContent: "",
    value: "",
  };

  constructor() {
    super();
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }

  setSelectedCategory(selectedCategory: SelectOption) {
    this.selectedCategory = selectedCategory;
    this.notify(this.selectedCategory);
  }
}

export default new SelectedCategoryModel();
