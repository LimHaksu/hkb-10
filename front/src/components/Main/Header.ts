import Component from "../Component";
import "./Header.scss";

const header = `
<div class="logo"><h2>logo</h2></div>
<div class="title"><h1>가계부</h1></div>
<div class="payment"><h2>결제수단 관리</h2></div>
`;

export default class Header extends Component {
  constructor() {
    super();

    this.view = document.createElement("header");
    this.view.innerHTML = header;
  }
}
