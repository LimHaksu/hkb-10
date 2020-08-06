import path from "./router/Path";
import router from "./router/Router";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Header from "./components/Main/Header";
import Menu from "./components/Main/Menu";

import History from "./components/History";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

import { HISTORY, CALENDAR, STATISTICS } from "./router/PathConstants";

import LoginModel from "./models/LoginModel";

import jwt_decode from "jwt-decode";

import "./stylesheet/main.scss";

router.setComponent("/login", new Login());
router.setComponent("/signup", new Signup());
router.setComponent(HISTORY, new History());
router.setComponent(CALENDAR, new Calendar());
router.setComponent(STATISTICS, new Statistics());

path.subscribe("changePath", (path: string) => {
  router.changeComponent(path);
});

function isLoggedIn(): boolean {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decoded: { user: string; iat: string } = jwt_decode(token);
    LoginModel.setLoggedInUserId(decoded.user);
    return true;
  }
  return false;
}

function init() {
  const app = document.getElementById("app");
  if (!app) {
    return;
  }

  app.appendChild(new Header().view);
  app.appendChild(new Menu().view);

  app.appendChild(router.getWrapper());
  if (isLoggedIn()) {
    const url = new URL(document.URL);
    const pathName = url instanceof URL ? url.pathname : url;
    path.changePath(pathName);
  } else {
    path.changePath("/login");
  }
}

init();
