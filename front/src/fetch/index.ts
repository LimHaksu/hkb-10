import getCategories from "./getCategories";
import getHistories from "./getHistories";
import getPaymentMethods from "./getPaymentMethods";
import postHistory from "./postHistory";
import putHistory from "./putHistory";

interface HistoryDataType {
  id?: string;
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
export default {
  getCategories,
  getHistories,
  getPaymentMethods,
  postHistory,
  putHistory,
};
