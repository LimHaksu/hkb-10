import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";
import HistoryDay from "./HistoryDay";
import "./HistoryList.scss";

interface HistoryItemOption extends ComponentOption {
  year: number;
  month: number;
  day: number;
  category: string;
  detail: string;
  paymentMethod: string;
  income: boolean;
  amount: number;
}

interface HistoryListOption extends ComponentOption {
  historyItemOptions?: HistoryItemOption[];
}

class HistoryList extends Component {
  prevDay: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  listItems: (HistoryDay | HistoryItem)[] = [];

  constructor(option?: HistoryListOption) {
    super("div", { ...option, classes: ["history-list"] });

    this.render(option);
  }

  render(option?: HistoryListOption) {
    if (!option) return;
    if (option.historyItemOptions) {
      option.historyItemOptions.forEach((historyItemOption) => {
        const { year, month, day, income, amount } = historyItemOption;

        const historyItem = new HistoryItem({
          ...historyItemOption,
          classes: ["history-item"],
        });
        this.listItems.push(historyItem);

        if (income) {
          this.totalIncome += amount;
        } else {
          this.totalOutcome += amount;
        }

        if (this.isNextDay(day)) {
          const historyDay = new HistoryDay({
            month,
            day,
            weekDay: this.getWeekDay(year, month, day),
            totalIncome: this.totalIncome,
            totalOutcome: this.totalOutcome,
            classes: ["history-day"],
          });
          this.listItems.push(historyDay);
          this.resetTotal();
        }
      });
      this.listItems = this.listItems.reverse();
      this.listItems.forEach((item) => {
        this.appendChild(item);
      });
    }
  }

  getWeekDay(year: number, month: number, day: number) {
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(year, month - 1, day);
    return weekDay[date.getDay()];
  }

  isNextDay(day: number) {
    if (day > this.prevDay) {
      this.prevDay = day;
      return true;
    }
    return false;
  }

  resetTotal() {
    this.totalIncome = 0;
    this.totalOutcome = 0;
  }
}

export default HistoryList;
