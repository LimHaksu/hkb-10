import Observable from "../../Observable";
import fetch, { PaymentMethodDataType } from "../../../fetch";
import { SelectOption } from "..";
import Path from "../../../router/Path";
import { HISTORY } from "../../../router/PathConstants";
import LoginModel from "../../../models/LoginModel";

class PaymentMethodModel extends Observable {
  path = Path;
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

  getPaymentMethods() {
    return this.paymentMethods;
  }

  initData() {
    if (Path.getPath() !== HISTORY) {
      return;
    }
    this.fetchGetPaymentMethods();
  }

  fetchGetPaymentMethods() {
    const userId = LoginModel.getLoggedInUserId();
    fetch
      .getPaymentMethods(userId)
      .then((paymentMethods: PaymentMethodDataType[]) => {
        if (paymentMethods instanceof Array) {
          this.paymentMethods = paymentMethods.map((element, idx) => {
            const id = element.id;
            const textContent = element.name;
            const value = (idx + 1).toString();
            this.paymentMethodTextContentValueMap.set(textContent, value);
            return {
              id,
              textContent,
              value,
            };
          });
          this.notify(this.paymentMethods);
        }
      });
  }

  async updateList() {
    this.fetchGetPaymentMethods();
    this.notify(this.paymentMethods);
  }
}

export default new PaymentMethodModel();
