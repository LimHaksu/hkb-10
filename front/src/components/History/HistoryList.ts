import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";
import HistoryDay from "./HistoryDay";
import "./HistoryList.scss";

interface HistoryItemOption extends ComponentOption {
  category: string;
  detail: string;
  paymentMethod: string;
  amount: number;
}

interface HistoryListOption extends ComponentOption {
  historyItemOptions?: HistoryItemOption[];
}

class HistoryList extends Component {
  constructor(option?: HistoryListOption) {
    super("div", { ...option, classes: ["history-list"] });

    this.render(option);
  }

  render(option?: HistoryListOption) {
    if (!option) return;
    if (option.historyItemOptions) {
      const historyDay = new HistoryDay({
        month: 7,
        day: 31,
        weekDay: "금",
        totalIncome: 50000,
        totalOutcome: 10000,
        classes: ["history-day"],
      });
      this.appendChild(historyDay);

      const historyItems = option.historyItemOptions.map(
        (option) => new HistoryItem({ ...option, classes: ["history-item"] })
      );
      this.appendChildren(historyItems);
    }
  }
}

export default HistoryList;
