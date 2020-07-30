import path from "./router/Path";
import router from "./router/Router";

import Header from "./components/Main/Header";
import Menu from "./components/Main/Menu";

import History from "./components/History";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

router.setComponent("/history", new History());
router.setComponent("/calendar", new Calendar());
router.setComponent("/statistics", new Statistics());

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
