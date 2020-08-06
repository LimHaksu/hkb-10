import Component from "../Component";
import LoginModel from "../../models/LoginModel";
import "./Header.scss";

const header = `
<div class="logo"><h2>logo</h2></div>
<div class="title"><h1>가계부</h1></div>
<div class="wrapper-right-menu">
  <div class="payment"><h2>결제수단 관리</h2></div>
  <button class="button-logout display-none">로그아웃</button>
</div>
`;

export default class Header extends Component {
  buttonLogout: HTMLElement | null = null;
  loginModel = LoginModel;
  constructor() {
    super();

    this.view = document.createElement("header");
    this.view.innerHTML = header;
    this.buttonLogout = this.view.querySelector(".button-logout");

    this.init();
    this.subscribeModels();
  }

  subscribeModels() {
    this.loginModel.subscribe("subLoginInHeader", (loggedInUserId: string) => {
      if (loggedInUserId) {
        this.buttonLogout?.classList.remove("display-none");
      } else {
        this.buttonLogout?.classList.add("display-none");
      }
    });
  }

  init() {
    this.buttonLogout?.addEventListener("click", () => {
      sessionStorage.clear();
      this.loginModel.setLogout();
      location.href = "/";
    });
  }
}
