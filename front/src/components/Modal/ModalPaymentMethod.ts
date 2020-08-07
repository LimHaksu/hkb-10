import Modal from "../Modal";
import Component from "../Component";
import ModalContent from "./ModalContent";
import { Button, Label, Input } from "../common";
import "./ModalPaymentMethod.scss";
import List from "../common/List";
import { SelectOption } from "../../models/HistoryModel";
import fetch from "../../fetch";
import PaymentMethodModel from "../../models/HistoryModel/InputForm/PaymentMethodModel";
import LoginModel from "../../models/LoginModel";

export default class ModalPaymentMethod extends Modal {
  divContent: Component | null = null;
  inputPaymentMethod: Input | null = null;
  listPaymentMethods: Component | null = null;

  constructor(onConfirm: Function) {
    super();

    this.divContent = new Component("div", {
      classes: ["modal-confirm", "flex-space-between", "flex-direction-column"],
    });
    const divInputForm = new Component("form", {
      classes: ["modal-input-form", "flex-space-between"],
      eventListeners: [
        {
          type: "submit",
          listener: (event) => {
            event.preventDefault();
          },
        },
      ],
    });
    const labelPaymentMethod = new Label({
      classes: ["label-payment-method"],
      textContent: "결제 수단 이름",
    });
    this.inputPaymentMethod = new Input({
      classes: ["input-payment-method", "input-select-common"],
      placeholder: "새로운 결제수단을 입력해주세요",
    });
    const buttonAddPaymentMethod = new Button({
      classes: ["button-common", "button-primary"],
      textContent: "등록",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            const userId = LoginModel.getLoggedInUserId();
            // todo... 해당 유저 정보로 결제수단 추가하는 로직 만들기
            fetch
              .postPaymentMethod(userId, {
                name: (<HTMLInputElement>this.inputPaymentMethod?.view).value,
              })
              .then((success) => {
                if (success) {
                  PaymentMethodModel.updateList();
                }
              });
          },
        },
      ],
    });
    this.listPaymentMethods = new List({
      type: "ul",
      classes: ["list-payment-method"],
    });

    const divModalContent = new ModalContent(
      "결제 수단 관리",
      this.divContent.appendChildren([
        divInputForm.appendChildren([
          labelPaymentMethod,
          this.inputPaymentMethod,
          buttonAddPaymentMethod,
        ]),
        this.listPaymentMethods,
      ])
    );

    this.appendChildren([divModalContent]);

    this.subscribeModels();
    this.makeListView(PaymentMethodModel.getPaymentMethods());
  }

  makeListView(paymentMethods: SelectOption[]) {
    if (paymentMethods instanceof Array) {
      if (!this.listPaymentMethods) return;
      this.listPaymentMethods?.destructor();
      this.listPaymentMethods = new List({
        type: "ul",
        classes: ["list-payment-method"],
      });
      this.listPaymentMethods.appendChildren([
        ...paymentMethods.map((paymentMethod) => {
          return new Component("li", {
            classes: ["li-payment-method"],
          }).appendChildren([
            new Component("span", {
              classes: ["payment-method-name"],
              innerHtml: `${paymentMethod.textContent}`,
            }),
            new Button({
              classes: ["button-delete", "button-common", "button-secondary"],
              textContent: "삭제",
              eventListeners: [
                {
                  type: "click",
                  listener: () => {
                    const id = paymentMethod.id!;
                    fetch.deletePaymentMethod(id).then((success) => {
                      if (success) {
                        PaymentMethodModel.updateList();
                      }
                    });
                  },
                },
              ],
            }),
          ]);
        }),
      ]);
      this.divContent?.appendChild(this.listPaymentMethods);
    }
  }

  subscribeModels() {
    PaymentMethodModel.subscribe(
      "subPaymentMethodInModalPaymentMethod",
      this.makeListView.bind(this)
    );
  }
}
