import Component, { ComponentOption } from "../Component";

interface InputOption extends ComponentOption {
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  placeholder?: string;
  value?: string;
}

class Input extends Component {
  constructor(option: InputOption) {
    super("input", option);

    this.setInputOption(option);
  }

  setInputOption(option: InputOption) {
    if (!option) return;
    if (option.type) {
      (<HTMLInputElement>this.view).type = option.type;
    }
    if (option.placeholder) {
      (<HTMLInputElement>this.view).placeholder = option.placeholder;
    }
    if (option.value) {
      console.log(option.value);
      this.view.setAttribute("value", option.value);
    }
  }

  setValue(value: string) {
    this.view.setAttribute("value", value);
  }
}

export default Input;
