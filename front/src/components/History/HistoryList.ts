import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";
import HistoryDay from "./HistoryDay";
import { HistoryListModel, HistoryDataType } from "../../models/HistoryModel";
import "./HistoryList.scss";

interface HistoryListOption extends ComponentOption {
  historyItemOptions?: HistoryDataType[];
}

class HistoryList extends Component {
  historyList: typeof HistoryListModel;
  prevDay: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  listItems: (HistoryDay | HistoryItem)[] = [];

  constructor(option?: HistoryListOption) {
    super("div", { ...option, classes: ["history-list"] });

    this.historyList = HistoryListModel;

    this.subscribeModels();
    this.initDatas();
  }

  subscribeModels() {
    this.historyList.subscribe(
      "subHistoryList",
      (historyList: HistoryDataType[]) => {
        historyList.forEach((historyListItem) => {
          const { year, month, day, income, amount } = historyListItem;

          const historyItem = new HistoryItem({
            ...historyListItem,
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
    );
  }

  initDatas() {
    this.historyList.initData();
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
