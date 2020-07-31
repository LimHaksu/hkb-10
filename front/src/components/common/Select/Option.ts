import Component, { ComponentOption } from "../../Component";

interface OptionOption extends ComponentOption {
  textContent: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

class Option extends Component {
  constructor(option: OptionOption) {
    super("option", option);

    this.setOptionOption(option);
  }

  setOptionOption(option: OptionOption) {
    const { textContent, value, disabled, selected } = option;
    this.view.textContent = textContent;
    (<HTMLOptionElement>this.view).value = value;
    if (disabled) {
      (<HTMLOptionElement>this.view).disabled = disabled;
    }
    if (selected) {
      (<HTMLOptionElement>this.view).selected = selected;
    }
  }
}

export default Option;
