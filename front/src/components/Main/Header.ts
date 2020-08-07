import Component from "../Component";
import LoginModel from "../../models/LoginModel";
import ModalPaymentMethod from "../Modal/ModalPaymentMethod";
import "./Header.scss";

const header = `
<div class="logo"><h2>logo</h2></div>
<div class="title"><h1>가계부</h1></div>
<div class="wrapper-right-menu">
  <button id="button-payment-method" class="button-common button-primary display-none">결제수단 관리</button>
  <button id="button-logout" class="button-common button-secondary display-none">로그아웃</button>
</div>
`;

export default class Header extends Component {
  buttonPaymentMethod: HTMLElement | null = null;
  buttonLogout: HTMLElement | null = null;
  loginModel = LoginModel;
  constructor() {
    super();

    this.view = document.createElement("header");
    this.view.innerHTML = header;
    this.buttonPaymentMethod = this.view.querySelector(
      "#button-payment-method"
    );
    this.buttonLogout = this.view.querySelector("#button-logout");

    this.init();
    this.subscribeModels();
  }

  subscribeModels() {
    this.loginModel.subscribe("subLoginInHeader", (loggedInUserId: string) => {
      if (loggedInUserId) {
        this.buttonPaymentMethod?.classList.remove("display-none");
        this.buttonLogout?.classList.remove("display-none");
      } else {
        this.buttonPaymentMethod?.classList.add("display-none");
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
    this.buttonPaymentMethod?.addEventListener("click", () => {
      new ModalPaymentMethod(() => {});
    });
  }
}
