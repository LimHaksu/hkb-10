import Observable from "../../Observable";
import fetch, { PaymentMethodDataType } from "../../../fetch";
import { SelectOption } from "..";

class PaymentMethodModel extends Observable {
  private paymentMethods: SelectOption[] = [];
  private selectedPaymentMethod: SelectOption = { textContent: "", value: "" };

  constructor() {
    super();
  }

  getSelectedPaymentMethod() {
    return this.selectedPaymentMethod;
  }

  setSelectedPaymentMethod(selectedPaymentMethod: SelectOption) {
    this.selectedPaymentMethod = selectedPaymentMethod;
    console.log(this.selectedPaymentMethod);
  }

  initData() {
    fetch
      .getPaymentMethods()
      .then((paymentMethods: PaymentMethodDataType[]) => {
        this.paymentMethods = paymentMethods.map((element) => ({
          textContent: element.name,
          value: element.name,
        }));
        this.notify(this.paymentMethods);
      });
  }
}

export default new PaymentMethodModel();
