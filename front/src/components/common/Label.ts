import Component, { ComponentOption } from "../Component";

interface LabelOption extends ComponentOption {
  textContent: string;
  for?: string;
}

class Label extends Component {
  constructor(option: LabelOption) {
    super("label", option);

    this.setLabelOption(option);
  }

  setLabelOption(option: LabelOption) {
    this.view.textContent = option.textContent;
    if (option.for) {
      (<HTMLLabelElement>this.view).htmlFor = option.for;
    }
  }
}

export default Label;
