import Component from "../Component";

import ChangeMonth from "./ChangeMonth";

import path from "../../router/Path";

import "./Menu.scss";

const menu = `<button id="histories">내역</button>
  <hr width="1" size="inherit">
  <button id="calendar">달력</button>
  <hr width="1" size="inherit">
  <button id="statistics">통계</button>`;

export default class Header extends Component {
  $btn_histories: HTMLElement | null;
  $btn_calendar: HTMLElement | null;
  $btn_statistics: HTMLElement | null;
  $menu: HTMLDivElement;
  $changeMonth: ChangeMonth;

  constructor() {
    super();
    this.$changeMonth = new ChangeMonth();

    this.view = document.createElement("section");
    this.view.className = "menu";

    this.view.appendChild(this.$changeMonth.view);

    this.$menu = document.createElement("div");
    this.$menu.className = "tab";
    this.$menu.innerHTML = menu;
    this.view.appendChild(this.$menu);

    this.$btn_histories = this.view.querySelector("#histories");
    this.$btn_calendar = this.view.querySelector("#calendar");
    this.$btn_statistics = this.view.querySelector("#statistics");

    this.addButtonEvent();
  }

  private addButtonEvent() {
    this.$btn_histories?.addEventListener("click", () => {
      path.pushState(undefined, "first title", "/history");
    });

    this.$btn_calendar?.addEventListener("click", () => {
      path.pushState(undefined, "first title", "/calendar");
    });

    this.$btn_statistics?.addEventListener("click", () => {
      path.pushState(undefined, "first title", "/statistics");
    });
  }
}
