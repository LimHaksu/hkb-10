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
import fetch from "../../fetch/";
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
  inputDetail: Input | null = null;
  buttonSubmit: Button | null = null;

  validationMap: Map<Component, boolean> = new Map();

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

    this.initValidationMap();
    this.checkAllInputsValidation();
  }

  initValidationMap() {
    if (this.inputDate) {
      this.validationMap.set(this.inputDate, true);
    }
    if (this.selectCategory) {
      this.validationMap.set(this.selectCategory, false);
    }
    if (this.selectPaymentMethod) {
      this.validationMap.set(this.selectPaymentMethod, false);
    }
    if (this.inputAmount) {
      this.validationMap.set(this.inputAmount, false);
    }
    if (this.inputDetail) {
      this.validationMap.set(this.inputDetail, false);
    }
  }

  areAllInputsValid(): boolean {
    let valid = true;
    this.validationMap.forEach((value) => {
      if (!value) {
        valid = false;
      }
    });
    return valid;
  }

  checkAllInputsValidation() {
    if (this.areAllInputsValid()) {
      (<HTMLButtonElement>this.buttonSubmit?.view).disabled = false;
      (<HTMLButtonElement>this.buttonSubmit?.view).classList.remove(
        "button-disabled"
      );
    } else {
      (<HTMLButtonElement>this.buttonSubmit?.view).disabled = true;
      (<HTMLButtonElement>this.buttonSubmit?.view).classList.add(
        "button-disabled"
      );
    }
  }

  resetInputs() {
    // 날짜 초기화
    this.dateModel.setDate(new Date(Date.now()));

    // 카테고리 초가화
    (<HTMLSelectElement>this.selectCategory?.view).selectedIndex = 0;

    // 결제수단 초기화
    (<HTMLSelectElement>this.selectPaymentMethod?.view).selectedIndex = 0;

    // 금액 초기화
    (<HTMLInputElement>this.inputAmount?.view).value = "원";

    // 내용 초기화
    (<HTMLInputElement>this.inputDetail?.view).value = "";

    // 확인버튼을 위한 유효성 검사 초기화
    this.validationMap.forEach((_, key) => {
      this.validationMap.set(key, false);
    });
    this.checkAllInputsValidation();
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

  handleButtonSubmitClicked() {
    // 수입, 지출 여부 가져오기
    const income = this.classificationModel.getClassification() === "income";

    // 날짜 가져오기
    const date = this.dateModel.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // 카테고리 가져오기
    const category = this.categoryModel.getSelectedCategory().value;

    // 결제수단 가져오기
    const paymentMethod = this.paymentMethodModel.getSelectedPaymentMethod()
      .textContent;

    // 금액 가져오기
    const amount = this.amountModel.getAmount();

    // 내용 가져오기
    const detail = this.detailModel.getDetail();

    const history = {
      income,
      year,
      month,
      day,
      category,
      paymentMethod,
      amount,
      detail,
    };
    fetch.postHistory(history);
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
      (<HTMLInputElement>this.inputDate?.view).value = date
        .toISOString()
        .split("T")[0];
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
      this.setAmountInputCursorBeforeWon();
    });
  }

  // 커서를 '원' 이전에 놓기
  setAmountInputCursorBeforeWon() {
    const inputAmountView = <HTMLInputElement>this.inputAmount?.view;
    inputAmountView.selectionStart = inputAmountView.value.length - 1;
    inputAmountView.selectionEnd = inputAmountView.value.length - 1;
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
      textContent: "내용 지우기",
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            this.resetInputs();
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

            // 인풋 체크
            // 선택한 index가 0보다 큼 === '선택하세요'가 아님
            const flag =
              (<HTMLSelectElement>this.selectCategory?.view).selectedIndex > 0;

            this.validationMap.set(this.selectCategory!, flag);
            this.checkAllInputsValidation();
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

            // 인풋 체크
            // 선택한 index가 0보다 큼 === '선택하세요'가 아님
            const flag =
              (<HTMLSelectElement>this.selectPaymentMethod?.view)
                .selectedIndex > 0;

            this.validationMap.set(this.selectPaymentMethod!, flag);
            this.checkAllInputsValidation();
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

            // 인풋 체크
            const flag = amount > 0;
            this.validationMap.set(this.inputAmount!, flag);

            this.checkAllInputsValidation();
          },
        },
        {
          type: "click",
          listener: (event) => {
            this.setAmountInputCursorBeforeWon();
          },
        },
      ],
    });
    const labelDetail = new Label({
      id: "label-detail",
      classes: ["label-detail"],
      textContent: "내용",
    });
    this.inputDetail = new Input({
      id: "input-detail",
      classes: ["input-detail", "input-select-common"],
      eventListeners: [
        {
          type: "keyup",
          listener: (event) => {
            const value = (<HTMLInputElement>event.currentTarget).value;
            this.detailModel.setDetail(value);

            // 인풋 체크
            const flag = value.length > 0;

            this.validationMap.set(this.inputDetail!, flag);
            this.checkAllInputsValidation();
          },
        },
      ],
    });
    this.buttonSubmit = new Button({
      id: "button-form-submit",
      classes: ["button", "button-primary", "button-form-submit"],
      textContent: "확인",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            this.handleButtonSubmitClicked();
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
          this.inputDetail,
        ]),
      ]),
      this.buttonSubmit,
    ]);
  }
}

export default InputForm;
