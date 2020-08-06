import Component from "../Component";
import { Button, Input } from "../common";
import path from "../../router/Path";
import fetch from "../../fetch";
import LoginModel from "../../models/LoginModel";
import "./Login.scss";

class Login extends Component {
  loginModel = LoginModel;

  formLogin: Component | null = null;
  inputId: Input | null = null;
  inputPw: Input | null = null;
  buttonSignUp: Button | null = null;
  buttonLocalLogin: Button | null = null;
  buttonGithubLogin: Button | null = null;

  constructor() {
    super("div", { id: "login-page", classes: ["login-page", "flex-column"] });

    this.loginCheckBeforeRender();

    this.render();
  }

  loginCheckBeforeRender() {
    const token = sessionStorage.getItem("token");
    if (token) {
      path.pushState(undefined, "이미 로그인 하셨습니다", "/history");
    }
  }

  handleButtonLocalLoginClicked() {
    const id = (<HTMLInputElement>this.inputId?.view).value;
    const password = (<HTMLInputElement>this.inputPw?.view).value;
    fetch.login(id, password).then((token) => {
      if (token) {
        sessionStorage.setItem("token", `Bearer ${token}`);
        this.loginModel.setIsLoggedIn(true);
        path.pushState(undefined, "로그인 성공!", "/history");
      }
    });
  }

  handleButtonGithubLoginClicked() {
    const url = "https://github.com/login/oauth/authorize?";
    const query = [
      `client_id=${process.env.GH_CLIENT_ID}`,
      `redirect_uri=${process.env.HOST}:${process.env.PORT}/githublogin`,
      `scope=user:email`,
    ].join("&");
    const githubAuthUrl = url + query;
    location.href = encodeURI(githubAuthUrl);
  }

  render() {
    this.formLogin = new Component("form", {
      id: "form-login",
      classes: ["form-login", "flex-column"],
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
    this.buttonLocalLogin = new Button({
      id: "button-local-login",
      classes: ["button-local-login", "button-common", "button-secondary"],
      textContent: "로그인",
      eventListeners: [
        {
          type: "click",
          listener: this.handleButtonLocalLoginClicked.bind(this),
        },
      ],
    });
    this.buttonGithubLogin = new Button({
      id: "button-github-login",
      classes: ["button-github-login", "button-common", "button-secondary"],
      textContent: "깃허브 로그인",
      eventListeners: [
        {
          type: "click",
          listener: this.handleButtonGithubLoginClicked,
        },
      ],
    });
    this.buttonSignUp = new Button({
      id: "button-signup",
      classes: ["button-signup", "button-common", "button-primary"],
      textContent: "회원가입",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            path.pushState(undefined, "회원가입", "/signup");
          },
        },
      ],
    });

    this.appendChildren([
      this.formLogin.appendChildren([
        this.inputId,
        this.inputPw,
        this.buttonLocalLogin,
      ]),
      this.buttonGithubLogin,
      this.buttonSignUp,
    ]);
  }
}

export default Login;
