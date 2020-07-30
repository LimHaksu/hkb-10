import Component from "../Component";

export default class Statistics extends Component {
  constructor() {
    super();

    this.view = document.createElement("div");
    this.view.innerText = "statistics";
  }
}
