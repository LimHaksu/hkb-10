import getCategories from "./getCategories";
import getHistories from "./getHistories";
import getPaymentMethods from "./getPaymentMethods";
import postHistory from "./postHistory";

interface HistoryDataType {
  year: number;
  month: number;
  day: number;
  category: string;
  paymentMethod: string;
  income: boolean;
  amount: number;
  detail: string;
}
interface PaymentMethodDataType {
  name: string;
}

export { HistoryDataType, PaymentMethodDataType };
export default { getCategories, getHistories, getPaymentMethods, postHistory };
