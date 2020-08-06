import { Button } from "../common";
import Component from "../Component";

export default class ModalContent extends Component {
  constructor(title: string, contentComponent: Component) {
    super("div", {
      classes: ["modal-content"],
      eventListeners: [
        {
          type: "click",
          listener: (e) => {
            e.stopPropagation();
          },
        },
      ],
    });

    const divHeader = new Component("div", {
      classes: ["flex-space-between", "modal-header"],
    });

    const h1Title = new Component("h1", {
      classes: ["modal-title"],
      innerHtml: title,
    });

    const buttonClose = new Button({
      textContent: "X",
      classes: ["button-close"],
      eventListeners: [
        {
          type: "click",
          listener: () => {
            const closeEvent = new Event("modalclose", { bubbles: true });
            this.view.dispatchEvent(closeEvent);
          },
        },
      ],
    });

    const divContent = new Component("div", {
      classes: ["modal-content"],
    });

    this.appendChildren([
      divHeader.appendChildren([h1Title, buttonClose]),
      divContent.appendChildren([contentComponent]),
    ]);
  }
}
