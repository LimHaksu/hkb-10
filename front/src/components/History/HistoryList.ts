import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";
import HistoryDay from "./HistoryDay";
import {
  CheckboxModel,
  TypeCheckbox,
  HistoryDataType,
} from "../../models/HistoryModel";
import "./HistoryList.scss";

interface HistoryListOption extends ComponentOption {
  historyItemOptions?: HistoryDataType[];
}

class HistoryList extends Component {
  checkbox: typeof CheckboxModel;

  prevDay: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  listItems: (HistoryDay | HistoryItem)[] = [];

  constructor(option?: HistoryListOption) {
    super("div", { ...option, classes: ["history-list"] });

    this.checkbox = CheckboxModel;

    this.setHistoryListOption(option);

    this.subscribeModels();
  }

  subscribeModels() {
    this.checkbox.subscribe(
      "subCheckboxInHistoryList",
      (isChecked: TypeCheckbox) => {
        this.setHidden(isChecked);
      }
    );
  }

  setHidden(isChecked: TypeCheckbox) {
    this.listItems.forEach((item) => {
      if (item instanceof HistoryItem) {
        if (item.data.income) {
          // true : item 이 수입
          if (isChecked.income) {
            item.view.classList.remove("history-item-hidden");
          } else {
            item.view.classList.add("history-item-hidden");
          }
        } else {
          // item 이 지출
          if (isChecked.outcome) {
            item.view.classList.remove("history-item-hidden");
          } else {
            item.view.classList.add("history-item-hidden");
          }
        }
      }
    });
  }

  setHistoryListOption(option?: HistoryListOption) {
    if (!option) return;
    if (option.historyItemOptions) {
      // 첫날 설정
      this.prevDay = option.historyItemOptions[0].day;

      const currentYear = option.historyItemOptions[0].year;
      const currentMonth = option.historyItemOptions[0].month;
      let currentDay = 0;
      option.historyItemOptions.forEach((historyListItem) => {
        const { year, month, day, income, amount } = historyListItem;
        currentDay = day;

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

      // 마지막 날짜에 대한 표기
      const historyDay = new HistoryDay({
        month: currentMonth,
        day: currentDay,
        weekDay: this.getWeekDay(currentYear, currentMonth, currentDay),
        totalIncome: this.totalIncome,
        totalOutcome: this.totalOutcome,
        classes: ["history-day"],
      });
      this.listItems.push(historyDay);
      this.resetTotal();

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
