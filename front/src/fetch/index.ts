import login from "./login";
// import loginGithub from "./loginGithub";
import signup from "./signup";
import getCategories from "./getCategories";
import getHistories from "./getHistories";
import getPaymentMethods from "./getPaymentMethods";
import postPaymentMethod from "./postPaymentMethod";
import deletePaymentMethod from "./deletePaymentMethod";
import postHistory from "./postHistory";
import putHistory from "./putHistory";
import deleteHistory from "./deleteHistory";

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
  id: number;
  name: string;
}

export { HistoryDataType, PaymentMethodDataType };
export default {
  login,
  // loginGithub,
  signup,
  getCategories,
  getHistories,
  getPaymentMethods,
  postPaymentMethod,
  deletePaymentMethod,
  postHistory,
  putHistory,
  deleteHistory,
};
