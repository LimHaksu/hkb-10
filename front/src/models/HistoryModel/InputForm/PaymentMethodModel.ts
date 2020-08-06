import Observable from "../../Observable";
import fetch, { PaymentMethodDataType } from "../../../fetch";
import { SelectOption } from "..";
import Path from "../../../router/Path";

class PaymentMethodModel extends Observable {
  path = Path;
  private paymentMethods: SelectOption[] = [];
  private paymentMethodTextContentValueMap: Map<string, string> = new Map();

  constructor() {
    super();

    this.init();
  }

  getValueFromTextContent(textContent: string) {
    return this.paymentMethodTextContentValueMap.get(textContent);
  }

  init() {
    this.path.subscribe("subPathInPaymentMethodModel", (pathName: string) => {
      if (pathName === "/history") {
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
    });
  }
}

export default new PaymentMethodModel();
