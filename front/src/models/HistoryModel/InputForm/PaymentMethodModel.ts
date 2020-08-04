import Observable from "../../Observable";
import fetch, { PaymentMethodDataType } from "../../../fetch";
import { SelectOption } from "..";

class PaymentMethodModel extends Observable {
  private paymentMethods: SelectOption[] = [];
  private paymentMethodTextContentValueMap: Map<string, string> = new Map();

  constructor() {
    super();
  }

  getValueFromTextContent(textContent: string) {
    return this.paymentMethodTextContentValueMap.get(textContent);
  }

  initData() {
    fetch
      .getPaymentMethods()
      .then((paymentMethods: PaymentMethodDataType[]) => {
        this.paymentMethods = paymentMethods.map((element, idx) => {
          const textContent = element.name;
          const value = (idx + 1).toString();
          this.paymentMethodTextContentValueMap.set(textContent, value);
          return {
            textContent,
            value,
          };
        });
        this.notify(this.paymentMethods);
      });
  }
}

export default new PaymentMethodModel();
