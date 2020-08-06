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

  pushState(data: unknown, title: string, path: string) {
    history.pushState(data, title, path);

    this.changePath(path);
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
