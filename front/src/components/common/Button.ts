import Component, { ComponentOption } from "../Component";

interface ButtonOption extends ComponentOption {
  textContent: string;
}

class Button extends Component {
  constructor(option: ButtonOption) {
    super("button", option);

    this.setButtonOption(option);
  }

  setButtonOption(option: ButtonOption) {
    this.view.textContent = option.textContent;
  }
}

export default Button;
