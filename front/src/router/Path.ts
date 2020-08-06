import Observable from "../models/Observable";

class PathModel extends Observable {
  private $pathName: string;

  constructor() {
    super();

    const url = new URL(document.URL);
    const pathName = url instanceof URL ? url.pathname : url;

    this.$pathName = pathName;

    window.addEventListener("popstate", () => {
      const url = new URL(document.URL);
      const pathName = url instanceof URL ? url.pathname : url;

      this.changePath(pathName);
    });
  }

  private isLoggedIn(): boolean {
    const token = sessionStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }

  pushState(data: unknown, title: string, path: string) {
    switch (path) {
      case "/signup":
        if (this.isLoggedIn()) {
          history.pushState(data, "이미 로그인하였습니다", "/history");
          this.changePath("/history");
        } else {
          history.pushState(data, title, path);
          this.changePath(path);
        }
        break;
      default:
        if (this.isLoggedIn()) {
          history.pushState(data, title, path);
          this.changePath(path);
        } else {
          location.href = "/login";
        }
        break;
    }
  }

  changePath(path: string) {
    this.$pathName = path;
    this.notify(this.$pathName);
  }

  getPath() {
    return this.$pathName;
  }
}

export default new PathModel();
