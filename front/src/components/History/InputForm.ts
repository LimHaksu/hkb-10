import Component from "../Component";
import { Button, Input, Label, Select } from "../common";
import {
  ClassificationModel,
} from "../../models/HistoryModel";
import "./InputForm.scss";

class InputForm extends Component {
  classificationModel: typeof ClassificationModel;
  buttonIncome: Button | null = null;
  buttonOutcome: Button | null = null;
  constructor() {
    super("div", { classes: ["input-form"] });

    this.render();
    this.classificationModel = ClassificationModel;
  }
  setButtonIncomePrimary() {
    this.buttonIncome?.view.classList.remove("button-secondary");
    this.buttonIncome?.view.classList.add("button-primary");
    this.buttonOutcome?.view.classList.remove("button-primary");
    this.buttonOutcome?.view.classList.add("button-secondary");
  }

  setButtonOutcomePrimary() {
    this.buttonOutcome?.view.classList.remove("button-secondary");
    this.buttonOutcome?.view.classList.add("button-primary");
    this.buttonIncome?.view.classList.remove("button-primary");
    this.buttonIncome?.view.classList.add("button-secondary");
  }

  subscribeModels() {
    this.classificationModel.subscribe(
      "subClassification",
      (classification: TypeClassificaion) => {
        switch (classification) {
          case "income":
            this.setButtonIncomePrimary();
            break;
          case "outcome":
            this.setButtonOutcomePrimary();
            break;
          default:
            break;
        }
      }
    );
  }

  initDatas() {
    this.classificationModel.initData();
  }

  render() {
    const divRow1 = new Component("div", { classes: ["history-row"] });

    const spanClassification = new Component("span", {
      id: "classification",
      classes: ["classification"],
    });
    const labelClassification = new Label({
      id: "label-classification",
      classes: ["label-classification"],
      textContent: "분류",
    });
    this.buttonIncome = new Button({
      id: "button-income",
      classes: ["button", "button-secondary"],
      textContent: "수입",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            event.preventDefault();
            this.classificationModel.changeClassifiacation();
          },
        },
      ],
    });
    this.buttonOutcome = new Button({
      id: "button-outcome",
      classes: ["button", "button-primary"],
      textContent: "지출",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            event.preventDefault();
            this.classificationModel.changeClassifiacation();
          },
        },
      ],
    });
    const buttonDelete = new Button({
      id: "button-delete",
      classes: ["button-delete"],
      textContent: "삭제",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            event.preventDefault();
            console.log("삭제 버튼 클릭");
          },
        },
      ],
    });

    const divRow2 = new Component("div", { classes: ["history-row"] });

    const labelDate = new Label({
      id: "label-date",
      classes: ["label-date"],
      textContent: "날짜",
    });
    const inputDate = new Input({
      type: "date",
      id: "input-date",
      classes: ["input-date", "input-select-common"],
    });

    const labelCategory = new Label({
      id: "label-category",
      classes: ["label-category"],
      textContent: "카테고리",
    });
    const selectCategory = new Select({
      id: "select-category",
      classes: ["select-category", "input-select-common"],
      selectOptions: [
        {
          textContent: "선택하세요",
          value: "none",
          disabled: true,
          selected: true,
        },
        { textContent: "월급", value: "salary" },
        { textContent: "용돈", value: "pocket-money" },
        { textContent: "기타수입", value: "other-income" },
        { textContent: "식비", value: "food" },
        { textContent: "생활", value: "life" },
        { textContent: "쇼핑/뷰티", value: "shopping-beauty" },
        { textContent: "교통", value: "traffic" },
        { textContent: "의료/건강", value: "medical-health" },
        { textContent: "문화/여가", value: "culture-leisure" },
        { textContent: "미분류", value: "etc" },
      ],
    });
    const labelPaymentMethod = new Label({
      id: "label-payment-method",
      classes: ["label-payment-method"],
      textContent: "결제수단",
    });
    const selectPaymentMethod = new Select({
      id: "select-payment-method",
      classes: ["select-payment-method", "input-select-common"],
      selectOptions: [
        {
          textContent: "선택하세요",
          value: "none",
          disabled: true,
          selected: true,
        },
        { textContent: "현대카드", value: "현대카드" },
        { textContent: "삼성카드", value: "삼성카드" },
        { textContent: "신한카드", value: "신한카드" },
      ],
    });

    const divRow3 = new Component("div", { classes: ["history-row"] });

    const labelAmount = new Label({
      id: "label-amount",
      classes: ["label-amount"],
      textContent: "금액",
    });
    const inputAmount = new Input({
      id: "input-amount",
      classes: ["input-amount", "input-select-common"],
      eventListeners: [
        {
          type: "change",
          listener: (event) => {
            console.log("변경");
          },
        },
      ],
    });
    const labelDetail = new Label({
      id: "label-detail",
      classes: ["label-detail"],
      textContent: "내용",
    });
    const inputDetail = new Input({
      id: "input-detail",
      classes: ["input-detail", "input-select-common"],
    });
    const buttonSubmit = new Button({
      id: "button-form-submit",
      classes: ["button", "button-primary", "button-form-submit"],
      textContent: "확인",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            console.log("확인 버튼 클릭");
          },
        },
      ],
    });

    this.appendChildren([
      divRow1.appendChildren([
        spanClassification.appendChildren([
          labelClassification,
          this.buttonIncome,
          this.buttonOutcome,
        ]),
        buttonDelete,
      ]),
      divRow2.appendChildren([
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelDate,
          inputDate,
        ]),
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelCategory,
          selectCategory,
        ]),
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelPaymentMethod,
          selectPaymentMethod,
        ]),
      ]),
      divRow3.appendChildren([
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelAmount,
          inputAmount,
        ]),
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelDetail,
          inputDetail,
        ]),
      ]),
      buttonSubmit,
    ]);
  }
}

export default InputForm;
