import Observable from "../../Observable";
import { SelectOption } from "..";

class SelectedPaymentMethodModel extends Observable {
  private selectedPaymentMethod: SelectOption = { textContent: "", value: "" };

  constructor() {
    super();
  }

  getSelectedPaymentMethod() {
    return this.selectedPaymentMethod;
  }

  setSelectedPaymentMethod(selectedPaymentMethod: SelectOption) {
    this.selectedPaymentMethod = selectedPaymentMethod;
    this.notify(this.selectedPaymentMethod);
  }
}

export default new SelectedPaymentMethodModel();
