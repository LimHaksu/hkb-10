import Component from "../Component";
import { Button, Input } from "../common";
import fetch from "../../fetch";
import "./Signup.scss";

class Signup extends Component {
  formSignup: Component | null = null;
  inputId: Input | null = null;
  inputPw: Input | null = null;
  inputPwCheck: Input | null = null;
  buttonSubmit: Button | null = null;

  constructor() {
    super("div", {
      id: "signup-page",
      classes: ["signup-page"],
    });

    this.render();
  }

  handleButtonSubmitClicked() {
    const id = (<HTMLInputElement>this.inputId?.view).value;
    const password = (<HTMLInputElement>this.inputPw?.view).value;
    fetch.signup(id, password).then((response) => {
      console.log("회원가입?", response);
    });
  }

  render() {
    this.formSignup = new Component("form", {
      id: "form-signup",
      classes: ["form-signup", "flex-column"],
      eventListeners: [
        {
          type: "submit",
          listener: (event) => {
            event.preventDefault();
          },
        },
      ],
    });
    this.inputId = new Input({
      id: "input-id",
      classes: ["input-id", "input-common"],
      placeholder: "아이디를 입력해주세요.",
    });
    this.inputPw = new Input({
      id: "input-pw",
      classes: ["input-pw", "input-common"],
      placeholder: "비밀번호를 입력해주세요.",
      type: "password",
    });
    this.inputPwCheck = new Input({
      id: "input-pw-check",
      classes: ["input-pw-check", "input-common"],
      placeholder: "비밀번호를 다시 입력해주세요.",
      type: "password",
    });
    this.buttonSubmit = new Button({
      id: "button-submit",
      classes: ["button-submit", "button-common", "button-primary"],
      textContent: "회원가입",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            this.handleButtonSubmitClicked();
          },
        },
      ],
    });

    this.appendChildren([
      this.formSignup.appendChildren([
        this.inputId,
        this.inputPw,
        this.inputPwCheck,
        this.buttonSubmit,
      ]),
    ]);
  }
}

export default Signup;
