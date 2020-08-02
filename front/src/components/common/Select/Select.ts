import Component, { ComponentOption } from "../../Component";
import Option from "./Option";

interface SelectOption extends ComponentOption {
  selectOptions: {
    textContent: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
  }[];
}

class Select extends Component {
  constructor(option: SelectOption) {
    super("select", option);

    this.setSelectOption(option);
  }

  setSelectOption(option: SelectOption) {
    // 기존에 있던 select options 을 지움
    this.setInnerHtml("");

    option.selectOptions.forEach((selectOption) => {
      const { textContent, value, disabled, selected } = selectOption;
      const optionComponent = new Option({
        textContent,
        value,
        disabled,
        selected,
      });
      (<HTMLSelectElement>this.view).options.add(
        <HTMLOptionElement>optionComponent.view
      );
    });
  }
}

export default Select;
