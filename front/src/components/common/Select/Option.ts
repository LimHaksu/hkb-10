import Component, { ComponentOption } from "../../Component";

interface OptionOption extends ComponentOption {
  textContent: string;
}

class Option extends Component {
  constructor(option: OptionOption) {
    super("option", option);

    this.setOptionOption(option);
  }

  setOptionOption(option: OptionOption) {
    this.view.textContent = option.textContent;
  }
}

export default Option;
