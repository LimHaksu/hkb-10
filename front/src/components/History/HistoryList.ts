import Component, { ComponentOption } from "../Component";
import HistoryItem from "./HistoryItem";
import HistoryDay from "./HistoryDay";
import {
  ClassificationModel,
  DateModel,
  CategoryModel,
  SelectedCategoryModel,
  PaymentMethodModel,
  SelectedPaymentMethodModel,
  AmountModel,
  DetailModel,
  CheckboxModel,
  TypeCheckbox,
  HistoryDataType,
} from "../../models/HistoryModel";
import "./HistoryList.scss";
import { Button } from "../common";

interface HistoryListOption extends ComponentOption {
  historyItemOptions?: HistoryDataType[];
}

class HistoryList extends Component {
  classificationModel = ClassificationModel;
  dateModel = DateModel;
  categoryModel = CategoryModel;
  selectedCategoryModel = SelectedCategoryModel;
  paymentMethodModel = PaymentMethodModel;
  selectedPaymentMethodModel = SelectedPaymentMethodModel;
  amountModel = AmountModel;
  detailModel = DetailModel;

  checkbox = CheckboxModel;

  prevDay: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  listItems: (HistoryDay | HistoryItem)[] = [];

  constructor(option?: HistoryListOption) {
    super("div", { ...option, classes: ["history-list"] });

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

        if (this.isNextDay(day)) {
          const historyDay = new HistoryDay({
            month,
            day: this.prevDay,
            weekDay: this.getWeekDay(year, month, this.prevDay),
            totalIncome: this.totalIncome,
            totalOutcome: this.totalOutcome,
            classes: ["history-day"],
          });
          this.listItems.push(historyDay);
          this.resetTotal();
          this.prevDay = day;
        }

        const editButton = new Button({
          id: "history-item-hover-button",
          classes: [
            "history-item-hover-button",
            "history-item-hover-button-hidden",
          ],
          textContent: "수정",
          eventListeners: [
            {
              type: "click",
              listener: (event) => {
                this.handleEditButtonClicked(historyListItem);
              },
            },
          ],
        });

        const historyItem = new HistoryItem({
          ...historyListItem,
          classes: ["history-item"],
          eventListeners: [
            {
              type: "mouseover",
              listener: (event) => {
                editButton.view.classList.remove(
                  "history-item-hover-button-hidden"
                );
              },
            },
            {
              type: "mouseout",
              listener: (event) => {
                editButton.view.classList.add(
                  "history-item-hover-button-hidden"
                );
              },
            },
          ],
        });
        historyItem.appendChild(editButton);

        this.listItems.push(historyItem);

        if (income) {
          this.totalIncome += amount;
        } else {
          this.totalOutcome += amount;
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
      return true;
    }
    return false;
  }

  handleEditButtonClicked(historyListItem: HistoryDataType) {
    const {
      income,
      year,
      month,
      day,
      category,
      paymentMethod,
      amount,
      detail,
    } = historyListItem;

    const incomeType = income ? "income" : "outcome";
    this.classificationModel.setClassifiacation(incomeType);

    // 한국시간이 UTC+09:00 라서 9시간을 더해줘야 달력에 오늘로 나온다.
    this.dateModel.setDate(new Date(year, month - 1, day, 9));

    const categoryValue = this.categoryModel.getValueFromTextContent(
      incomeType,
      category
    );
    this.selectedCategoryModel.setSelectedCategory({
      textContent: category,
      value: categoryValue!,
    });

    const paymentMethodValue = this.paymentMethodModel.getValueFromTextContent(
      paymentMethod
    );
    this.selectedPaymentMethodModel.setSelectedPaymentMethod({
      textContent: paymentMethod,
      value: paymentMethodValue!,
    });
    this.amountModel.setAmount(amount);
    this.detailModel.setDetail(detail);
  }

  resetTotal() {
    this.totalIncome = 0;
    this.totalOutcome = 0;
  }
}

export default HistoryList;
