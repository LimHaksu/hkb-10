interface EventListeners {
  type: string;
  listener: (event: Event) => void;
}

export interface ComponentOption {
  id?: string;
  classes?: string[];
  innerHtml?: string;
  eventListeners?: EventListeners[];
}

export default class Component {
  view: HTMLElement;
  children: Map<string, Component> = new Map();
  eventListeners: EventListeners[] = [];

  constructor(tag = "div", option?: ComponentOption) {
    this.view = document.createElement(tag);
    this.setOption(option);
  }

  setOption(option?: ComponentOption): void {
    if (!option) return;
    if (option.id) this.view.id = option.id;
    if (option.classes) {
      option.classes.forEach((c) => {
        this.view.classList.add(c);
      });
    }
    if (option.innerHtml) {
      this.setInnerHtml(option.innerHtml);
    }
    if (option.eventListeners) {
      option.eventListeners.forEach((eventListener) => {
        const { type, listener } = eventListener;
        this.view.addEventListener(type, listener);
        this.eventListeners.push(eventListener);
      });
    }
  }

  destructor(): void {
    this.children.forEach((child) => {
      child.destructor();
    });
    this.eventListeners.forEach((eventListener) => {
      const { type, listener } = eventListener;
      this.view.removeEventListener(type, listener);
    });
    this.view.remove();
  }

  appendChildren(elements: Component[]): Component {
    elements.forEach((element) => {
      this.appendChild(element);
    });
    return this;
  }

  appendChild(element: Component): void {
    this.children.set(element.view.id, element);
    this.view.appendChild(element.view);
  }

  setInnerHtml(html: string): void {
    this.view.innerHTML = html;
  }

  reRender(): void {
    return;
  }
}
