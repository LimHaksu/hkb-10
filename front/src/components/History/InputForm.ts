import Component from "../Component";
import { Button, Input, Label, Select } from "../common";

class InputForm extends Component {
  constructor() {
    super("div", { classes: ["input-form"] });

    this.render();
  }

  render() {
    const divRow1 = new Component("div", { classes: ["history-row"] });
    const divRow2 = new Component("div", { classes: ["history-row"] });
    const divRow3 = new Component("div", { classes: ["history-row"] });
    const spanClassification = new Component("span", {
      id: "classification",
      classes: ["classification"],
    });
    const labelClassification = new Label({
      id: "label-classification",
      classes: ["label-classification"],
      textContent: "분류",
    });
    const buttonIncome = new Button({
      id: "button-income",
      classes: ["button", "button-secondary"],
      textContent: "수입",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            event.preventDefault();
            console.log("수입 버튼 클릭");
          },
        },
      ],
    });
    const buttonOutcome = new Button({
      id: "button-outcome",
      classes: ["button", "button-primary"],
      textContent: "지출",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            event.preventDefault();
            console.log("지출 버튼 클릭");
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

    const labelDate = new Label({
      id: "label-date",
      classes: ["label-date"],
      textContent: "날짜",
    });
    const inputDate = new Input({
      type: "date",
      id: "input-date",
      classes: ["input-date"],
    });

    const labelCategory = new Label({
      id: "label-category",
      classes: ["label-category"],
      textContent: "카테고리",
    });
    const selectCategory = new Select({
      id: "select-category",
      classes: ["select-category"],
      selectOptions: [
        "월급",
        "용돈",
        "기타수입",
        "식비",
        "생활",
        "쇼핑/뷰티",
        "교통",
        "의료/건강",
        "문화/여가",
        "미분류",
      ],
    });
    const labelPaymentMethod = new Label({
      id: "label-payment-method",
      classes: ["label-payment-method"],
      textContent: "결제수단",
    });
    const selectPaymentMethod = new Select({
      id: "select-payment-method",
      classes: ["select-payment-method"],
      selectOptions: ["결제수단1", "결제수단2", "결제수단3"],
    });
    const labelAmount = new Label({
      id: "label-amount",
      classes: ["label-amount"],
      textContent: "금액",
    });
    const inputAmount = new Input({
      id: "input-amount",
      classes: ["input-amount"],
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
    const inputDetail = new Component("input", {
      id: "input-detail",
      classes: ["input-detail"],
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
          buttonIncome,
          buttonOutcome,
        ]),
        buttonDelete,
      ]),
      divRow2.appendChildren([
        new Component("span").appendChildren([labelDate, inputDate]),
        new Component("span").appendChildren([labelCategory, selectCategory]),
        new Component("span").appendChildren([
          labelPaymentMethod,
          selectPaymentMethod,
        ]),
      ]),
      divRow3.appendChildren([
        new Component("span").appendChildren([labelAmount, inputAmount]),
        new Component("span").appendChildren([labelDetail, inputDetail]),
      ]),
      buttonSubmit,
    ]);
  }
}

export default InputForm;
