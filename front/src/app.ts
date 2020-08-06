import path from "./router/Path";
import router from "./router/Router";

import Header from "./components/Main/Header";
import Menu from "./components/Main/Menu";

import History from "./components/History";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

import { HISTORY, CALENDAR, STATISTICS } from "./router/PathConstants";

import "./stylesheet/main.scss";

router.setComponent(HISTORY, new History());
router.setComponent(CALENDAR, new Calendar());
router.setComponent(STATISTICS, new Statistics());

path.subscribe("changePath", (path: string) => {
  router.changeComponent(path);
});

function init() {
  const app = document.getElementById("app");
  if (!app) {
    return;
  }

  const url = new URL(document.URL);
  const pathName = url instanceof URL ? url.pathname : url;

  app.appendChild(new Header().view);
  app.appendChild(new Menu().view);

  app.appendChild(router.getWrapper());
  path.changePath(pathName);
}

init();
