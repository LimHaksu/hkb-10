class Component {
  view: HTMLElement = document.createElement("div");
  model: Map<string, any> = new Map();
  child: Map<string, Component> = new Map();

  setEventListeners() {}

  render() {
    if (this.setEventListeners) {
      this.setEventListeners();
    }

    return this.view;
  }
}
