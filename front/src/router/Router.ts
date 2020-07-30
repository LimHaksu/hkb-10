import Component from "../components/Component";

class Route {
  private $mappingTable: Map<string, Component>;
  private $component: Component | null;
  private $wrapper: HTMLElement;

  constructor() {
    this.$mappingTable = new Map<string, Component>();
    this.$component = null;
    this.$wrapper = document.createElement("section");
  }

  setComponent(path: string, component: Component) {
    this.$mappingTable.set(path, component);
  }

  changeComponent(path: string) {
    const targetComponent = this.$mappingTable.get(path);

    if (!targetComponent) {
      return;
    }
    this.$component = targetComponent;

    this.render();
  }

  private render() {
    if (!this.$component) {
      return;
    }

    while (this.$wrapper.firstChild) {
      this.$wrapper.removeChild(this.$wrapper.firstChild);
    }

    this.$wrapper.appendChild(this.$component.view);
  }

  getWrapper() {
    return this.$wrapper;
  }
}

export default new Route();
