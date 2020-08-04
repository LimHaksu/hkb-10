import Observable from "../../Observable";
import ClassificationModel, { TypeClassificaion } from "./ClassificationModel";
import { SelectOption } from "../";
import fetch from "../../../fetch";

interface Category {
  value: number;
  content: string;
  income: number;
}

class CategoryModel extends Observable {
  private classificationModel: typeof ClassificationModel;

  private categories: SelectOption[] = [];
  private classifiedCategories: {
    income: { textContent: string; value: string }[];
    outcome: { textContent: string; value: string }[];
  } = {
    income: [],
    outcome: [],
  };
  private categoryTextContentValueMap: {
    income: Map<string, string>;
    outcome: Map<string, string>;
  } = {
    income: new Map(),
    outcome: new Map(),
  };

  constructor() {
    super();

    this.classificationModel = ClassificationModel;

    this.init();
  }

  init() {
    fetch.getCategories().then((categories) => {
      categories.forEach((category: Category) => {
        const { value, content, income } = category;
        this.classifiedCategories[income === 1 ? "income" : "outcome"].push({
          textContent: content,
          value: value.toString(),
        });
        this.categoryTextContentValueMap[
          income === 1 ? "income" : "outcome"
        ].set(content, value.toString());
      });

      this.notify(this.categories);
    });
  }

  getValueFromTextContent(type: "income" | "outcome", textContent: string) {
    return this.categoryTextContentValueMap[type].get(textContent);
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
