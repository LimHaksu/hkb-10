import Component from "../Component";

export default class History extends Component {
  constructor() {
    super();

    this.view = document.createElement("div");
    this.view.innerText = "history";
  }
}