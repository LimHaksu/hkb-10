import path from "./router/Path";
import router from "./router/Router";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Header from "./components/Main/Header";
import Menu from "./components/Main/Menu";

import History from "./components/History";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

import "./stylesheet/main.scss";

router.setComponent("/login", new Login());
router.setComponent("/signup", new Signup());
router.setComponent("/history", new History());
router.setComponent("/calendar", new Calendar());
router.setComponent("/statistics", new Statistics());

path.subscribe("changePath", (path: string) => {
  router.changeComponent(path);
});

function isLoggedIn(): boolean {
  const token = sessionStorage.getItem("token");
  if (token) {
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
