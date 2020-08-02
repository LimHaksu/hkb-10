import AmountModel from "./InputForm/AmountModel";
import CategoryModel from "./InputForm/CategoryModel";
import ClassificationModel, {
  TypeClassificaion,
} from "./InputForm/ClassificationModel";
import DateModel from "./InputForm/DateModel";
import DetailModel from "./InputForm/DetailModel";
import PaymentMethodModel from "./InputForm/PaymentMethodModel";

interface SelectOption {
  textContent: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

export { TypeClassificaion, SelectOption };
export {
  AmountModel,
  CategoryModel,
  ClassificationModel,
  DateModel,
  DetailModel,
  PaymentMethodModel,
};
