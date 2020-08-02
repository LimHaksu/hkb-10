import ClassificationModel, {
  TypeClassificaion,
} from "./InputForm/ClassificationModel";
interface SelectOption {
  textContent: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

export { TypeClassificaion, SelectOption };
export {
  ClassificationModel,
};
