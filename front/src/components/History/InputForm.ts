import Component from "../Component";
import { Button, Input, Label, Select } from "../common";
import {
  AmountModel,
  CategoryModel,
  ClassificationModel,
  DateModel,
  DetailModel,
  PaymentMethodModel,
  TypeClassificaion,
  SelectOption,
} from "../../models/HistoryModel";
import "./InputForm.scss";

class InputForm extends Component {
  classificationModel: typeof ClassificationModel;
  dateModel: typeof DateModel;
  categoryModel: typeof CategoryModel;
  paymentMethodModel: typeof PaymentMethodModel;
  amountModel: typeof AmountModel;
  detailModel: typeof DetailModel;

  buttonIncome: Button | null = null;
  buttonOutcome: Button | null = null;
  inputDate: Input | null = null;
  selectCategory: Select | null = null;
  selectPaymentMethod: Select | null = null;
  inputAmount: Input | null = null;

  constructor() {
    super("div", { classes: ["input-form"] });

    this.render();

    this.classificationModel = ClassificationModel;
    this.dateModel = DateModel;
    this.categoryModel = CategoryModel;
    this.paymentMethodModel = PaymentMethodModel;
    this.amountModel = AmountModel;
    this.detailModel = DetailModel;

    this.subscribeModels();
    this.initDatas();
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

    this.dateModel.subscribe("subDate", (date: Date) => {
      this.inputDate?.setValue(date.toISOString().split("T")[0]);
    });

    this.categoryModel.subscribe(
      "subCategory",
      (categoryOptions: SelectOption[]) => {
        this.selectCategory?.setSelectOption({
          selectOptions: [
            {
              textContent: "선택하세요",
              value: "none",
              disabled: true,
              selected: true,
            },
            ...categoryOptions,
          ],
        });
      }
    );

    this.paymentMethodModel.subscribe(
      "subPaymentMethod",
      (paymentMethodOptions: SelectOption[]) => {
        this.selectPaymentMethod?.setSelectOption({
          selectOptions: [
            {
              textContent: "선택하세요",
              value: "none",
              disabled: true,
              selected: true,
            },
            ...paymentMethodOptions,
          ],
        });
      }
    );

    this.amountModel.subscribe("subAmountInInputForm", (amount: number) => {
      // 금액 입력창에 콤마, 원 붙여주기
      const inputAmountView = <HTMLInputElement>this.inputAmount?.view;
      if (amount > 0) {
        inputAmountView.value = `${amount.toLocaleString()}원`;
      } else {
        inputAmountView.value = "원";
      }
      // 커서를 '원' 이전에 놓기
      inputAmountView.selectionStart = inputAmountView.value.length - 1;
      inputAmountView.selectionEnd = inputAmountView.value.length - 1;
    });
  }

  initDatas() {
    this.classificationModel.initData();
    this.dateModel.initData();
    this.categoryModel.initData();
    this.paymentMethodModel.initData();
    this.amountModel.initData();
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
            this.classificationModel.setClassifiacation("income");
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
            this.classificationModel.setClassifiacation("outcome");
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
    this.inputDate = new Input({
      type: "date",
      id: "input-date",
      classes: ["input-date", "input-select-common"],
      eventListeners: [
        {
          type: "change",
          listener: (event: Event) => {
            const dateString = (<HTMLInputElement>event.currentTarget).value;
            if (dateString) {
              this.dateModel.setDate(new Date(dateString));
            }
          },
        },
      ],
    });

    const labelCategory = new Label({
      id: "label-category",
      classes: ["label-category"],
      textContent: "카테고리",
    });
    this.selectCategory = new Select({
      id: "select-category",
      classes: ["select-category", "input-select-common"],
      selectOptions: [
        {
          textContent: "선택하세요",
          value: "none",
          disabled: true,
          selected: true,
        },
      ],
      eventListeners: [
        {
          type: "change",
          listener: (event) => {
            const target = <HTMLSelectElement>event.currentTarget;
            const idx = target.selectedIndex;
            const textContent = target[idx].textContent || "";
            const value = target[idx].getAttribute("value") || "";
            this.categoryModel.setSelectedCategory({ textContent, value });
          },
        },
      ],
    });

    const labelPaymentMethod = new Label({
      id: "label-payment-method",
      classes: ["label-payment-method"],
      textContent: "결제수단",
    });
    this.selectPaymentMethod = new Select({
      id: "select-payment-method",
      classes: ["select-payment-method", "input-select-common"],
      selectOptions: [
        {
          textContent: "선택하세요",
          value: "none",
          disabled: true,
          selected: true,
        },
      ],
      eventListeners: [
        {
          type: "change",
          listener: (event) => {
            const target = <HTMLSelectElement>event.currentTarget;
            const idx = target.selectedIndex;
            const textContent = target[idx].textContent || "";
            const value = target[idx].getAttribute("value") || "";
            this.paymentMethodModel.setSelectedPaymentMethod({
              textContent,
              value,
            });
          },
        },
      ],
    });

    const divRow3 = new Component("div", { classes: ["history-row"] });

    const labelAmount = new Label({
      id: "label-amount",
      classes: ["label-amount"],
      textContent: "금액",
    });
    this.inputAmount = new Input({
      id: "input-amount",
      classes: ["input-amount", "input-select-common"],
      eventListeners: [
        {
          type: "keyup",
          listener: (event) => {
            const value = (<HTMLInputElement>event.currentTarget).value;

            // comma 제거
            const commaRemoved = value.replace(/[^0-9]/g, "");
            let amount = 0;
            if (commaRemoved) {
              amount = parseInt(commaRemoved);
            }

            this.amountModel.setAmount(amount);
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
      eventListeners: [
        {
          type: "keyup",
          listener: (event) => {
            const value = (<HTMLInputElement>event.currentTarget).value;
            this.detailModel.setDetail(value);
          },
        },
      ],
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
          this.inputDate,
        ]),
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelCategory,
          this.selectCategory,
        ]),
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelPaymentMethod,
          this.selectPaymentMethod,
        ]),
      ]),
      divRow3.appendChildren([
        new Component("span", { classes: ["row-flex"] }).appendChildren([
          labelAmount,
          this.inputAmount,
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
