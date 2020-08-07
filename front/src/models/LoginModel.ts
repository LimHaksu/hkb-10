import Observable from "./Observable";

class LoginModel extends Observable {
  loggedInUserId = "";
  constructor() {
    super();
  }

  setLogout() {
    this.loggedInUserId = "";
    this.notify(this.loggedInUserId);
  }

  setLoggedInUserId(userId: string) {
    this.loggedInUserId = userId;
    this.notify(this.loggedInUserId);
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }
}

export default new LoginModel();
