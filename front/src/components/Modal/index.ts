import Component from "../Component";
import "./Modal.scss";

export default class Modal extends Component {
  constructor() {
    super("div", {
      classes: ["modal-overlay"],
      eventListeners: [
        {
          type: "modalclose",
          listener: () => {
            this.destructor();
          },
        },
        {
          type: "click",
          listener: () => {
            this.destructor();
          },
        },
      ],
    });

    document.body.appendChild(this.view);
  }
}
