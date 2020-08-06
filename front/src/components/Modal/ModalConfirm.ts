import Modal from "../Modal";
import Component from "../Component";
import ModalContent from "./ModalContent";
import { Button } from "../common";
import "./ModalConfirm.scss";

export default class ModalConfirm extends Modal {
  constructor(onConfirm: Function) {
    super();

    const divContent = new Component("div", {
      classes: ["modal-confirm", "flex-space-between"],
    });
    const buttonConfirm = new Button({
      textContent: "확인",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            onConfirm();
            this.destructor();
          },
        },
      ],
      classes: ["button", "button-secondary"],
    });
    const buttonCancel = new Button({
      textContent: "취소",
      eventListeners: [
        {
          type: "click",
          listener: () => {
            this.destructor();
          },
        },
      ],
      classes: ["button", "button-primary"],
    });
    divContent.appendChildren([buttonConfirm, buttonCancel]);

    const divModalContent = new ModalContent(
      "정말로 삭제하시겠습니까?",
      divContent
    );

    this.appendChildren([divModalContent]);
  }
}
