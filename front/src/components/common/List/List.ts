import Component, { ComponentOption } from "../../Component";

interface ListOption extends ComponentOption {
  type: "ol" | "ul";
}

class List extends Component {
  constructor(option: ListOption) {
    super(option.type, option);
  }
}

export default List;
