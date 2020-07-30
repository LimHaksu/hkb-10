import Component, { ComponentOption } from "../../Component";
import Option from "./Option";

interface SelectOption extends ComponentOption {
  selectOptions: string[];
}

class Select extends Component {
  constructor(option: SelectOption) {
    super("select", option);

    this.setSelectOption(option);
  }

  setSelectOption(option: SelectOption) {
    option.selectOptions.forEach((selectOption) => {
      const optionComponent = new Option({ textContent: selectOption });
      (<HTMLSelectElement>this.view).options.add(
        <HTMLOptionElement>optionComponent.view
      );
    });
  }
}

export default Select;
