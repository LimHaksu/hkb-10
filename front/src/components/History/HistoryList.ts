import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";

interface HistoryItemData {
  category: string;
  detail: string;
  paymentMethod: string;
  amount: number;
}

interface HistoryListOption extends ComponentOption {
  historyItemDatas?: HistoryItemData[];
}

class HistoryList extends Component {
  constructor(option?: HistoryListOption) {
    super("div", option);

    this.render(option);
  }

  render(option?: HistoryListOption) {
    if (!option) return;
    if (option.historyItemDatas) {
      const historyItems = option.historyItemDatas.map(
        (data) => new HistoryItem(data)
      );
      this.appendChildren(historyItems);
    }
  }
}

export default HistoryList;
