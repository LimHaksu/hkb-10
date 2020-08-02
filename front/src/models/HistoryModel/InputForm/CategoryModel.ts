import Observable from "../../Observable";
import ClassificationModel, { TypeClassificaion } from "./ClassificationModel";
import { SelectOption } from "../";

class CategoryModel extends Observable {
  private classificationModel: typeof ClassificationModel;

  private categories: SelectOption[] = [];
  private classifiedCategories = {
    income: [
      { textContent: "월급", value: "salary" },
      { textContent: "용돈", value: "pocket-money" },
      { textContent: "기타수입", value: "other-income" },
    ],
    outcome: [
      { textContent: "식비", value: "food" },
      { textContent: "생활", value: "life" },
      { textContent: "쇼핑/뷰티", value: "shopping-beauty" },
      { textContent: "교통", value: "traffic" },
      { textContent: "의료/건강", value: "medical-health" },
      { textContent: "문화/여가", value: "culture-leisure" },
      { textContent: "미분류", value: "etc" },
    ],
  };
  private selectedCategory: SelectOption = { textContent: "", value: "" };

  constructor() {
    super();

    this.classificationModel = ClassificationModel;
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }

  setSelectedCategory(selectedCategory: SelectOption) {
    this.selectedCategory = selectedCategory;
  }

  initData() {
    this.classificationModel.subscribe(
      "subClassificationForCategoryModel",
      (classification: TypeClassificaion) => {
        this.categories = this.classifiedCategories[classification];
        this.notify(this.categories);
      }
    );
    this.classificationModel.initData();

    this.notify(this.categories);
  }
}

export default new CategoryModel();
