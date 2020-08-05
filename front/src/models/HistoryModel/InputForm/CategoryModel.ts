import Observable from "../../Observable";
import ClassificationModel, { TypeClassificaion } from "./ClassificationModel";
import { SelectOption } from "../";
import fetch from "../../../fetch";

interface Category {
  id: number;
  value: number;
  content: string;
  income: number;
}

class CategoryModel extends Observable {
  private classificationModel: typeof ClassificationModel;

  private categories: SelectOption[] = [];
  private classifiedCategories: {
    income: { id: number; textContent: string; value: string }[];
    outcome: { id: number; textContent: string; value: string }[];
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
  private categoryTextContentIdMap: {
    income: Map<string, number>;
    outcome: Map<string, number>;
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
        const { id, value, content, income } = category;
        this.classifiedCategories[income === 1 ? "income" : "outcome"].push({
          id,
          textContent: content,
          value: value.toString(),
        });
        this.categoryTextContentValueMap[
          income === 1 ? "income" : "outcome"
        ].set(content, value.toString());
        this.categoryTextContentIdMap[income === 1 ? "income" : "outcome"].set(
          content,
          id
        );
      });

      this.notify(this.categories);
    });
  }

  getValueFromTextContent(type: "income" | "outcome", textContent: string) {
    return this.categoryTextContentValueMap[type].get(textContent);
  }

  getIdFromTextContent(type: "income" | "outcome", textContent: string) {
    return this.categoryTextContentIdMap[type].get(textContent);
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
