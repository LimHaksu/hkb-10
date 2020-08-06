import Observable from "../../Observable";
import fetch, { PaymentMethodDataType } from "../../../fetch";
import { SelectOption } from "..";
import Path from "../../../router/Path";
import { HISTORY } from "../../../router/PathConstants";

class PaymentMethodModel extends Observable {
  private paymentMethods: SelectOption[] = [];
  private paymentMethodTextContentValueMap: Map<string, string> = new Map();

  constructor() {
    super();

    Path.subscribe("paymentMethodChange", (pathName: string) => {
      if (pathName !== HISTORY) {
        return;
      }

      this.initData();
    });
  }

  getValueFromTextContent(textContent: string) {
    return this.paymentMethodTextContentValueMap.get(textContent);
  }

  initData() {
    if (Path.getPath() !== HISTORY) {
      return;
    }

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

  async addMethod(method: SelectOption) {
    // this.paymentMethod = await fetchAddMethod(method)
    this.notify(this.paymentMethods);
  }

  async deleteMethod(method: SelectOption) {
    //this.paymentMethod = await fetchDeleteMethod(method)
    this.notify(this.paymentMethods);
  }
}

export default new PaymentMethodModel();
