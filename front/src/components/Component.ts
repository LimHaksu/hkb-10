interface EventListeners {
  type: string;
  listener: () => void;
}

export interface ComponentOption {
  id?: string;
  classes?: string[];
  text?: string;
  eventListeners?: EventListeners[];
}

export default class Component {
  view: HTMLElement;
  children: Component[] = [];
  eventListeners: EventListeners[] = [];

  constructor(tag: string = "div", option?: ComponentOption) {
    this.view = document.createElement(tag);
    this.setOption(option);
  }

  setOption(option?: ComponentOption) {
    if (!option) return;
    if (option.id) this.view.id = option.id;
    if (option.classes) {
      option.classes.forEach((c) => {
        this.view.classList.add(c);
      });
    }
    if (option.text) {
      this.view.textContent = option.text;
    }
    if (option.eventListeners) {
      option.eventListeners.forEach((eventListener) => {
        const { type, listener } = eventListener;
        this.view.addEventListener(type, listener);
        this.eventListeners.push(eventListener);
      });
    }
  }

  desctuctor() {
    this.children.forEach((child) => {
      child.desctuctor();
    });
    this.eventListeners.forEach((eventListenr) => {
      const { type, listener } = eventListenr;
      this.view.removeEventListener(type, listener);
    });
    this.view.remove();
  }

  appendChild(element: Component) {
    this.children.push(element);
    this.view.appendChild(element.view);
  }

  setInnerHtml(html: string) {
    this.view.innerHTML = html;
  }

  setText(text: string) {
    this.view.textContent = text;
  }
}
