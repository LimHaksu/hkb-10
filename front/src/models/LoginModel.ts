import Observable from "./Observable";

class LoginModel extends Observable {
  isLoggedIn = false;
  constructor() {
    super();
  }

  setIsLoggedIn(flag: boolean) {
    this.isLoggedIn = flag;
    this.notify(this.isLoggedIn);
  }
  getIsLoggedIn() {
    return this.getIsLoggedIn;
  }
}

export default new LoginModel();
