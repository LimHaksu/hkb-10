import Component from "../Component";
import InputForm from "./InputForm";
import HistoryList from "./HistoryList";
import Input from "../common/Input";
import Label from "../common/Label";
import fetch, { HistoryDataType } from "../../fetch";
import "./History.scss";

class History extends Component {
  constructor() {
    super("div", { id: "history", classes: ["history"] });

    this.init();
  }

  init() {
    fetch
      .getHistories(2020, 7)
      .then((data: HistoryDataType[]) => {
        this.render(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  render(data: HistoryDataType[]) {
    const inputForm = new InputForm();

    const divIncome = new Component("div", {
      id: "history-div-income",
      classes: ["history-div", "history-div-income"],
    });
    const checkboxIncome = new Input({
      type: "checkbox",
      id: "history-checkbox-income",
      classes: ["history-checkbox-income"],
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            console.log("수입 체크박스 클릭");
          },
        },
      ],
    });
    const labelIncome = new Label({
      id: "history-label-income",
      classes: ["history-label-income"],
      for: "history-checkbox-income",
      textContent: "수입",
    });
    const spanIncomeAmount = new Component("span", {
      classes: ["history-income-amount"],
      innerHtml: `1000000`,
    });

    const divOutcome = new Component("div", {
      id: "history-div-outcome",
      classes: ["history-div", "history-div-outcome"],
    });
    const checkboxOutcome = new Input({
      type: "checkbox",
      id: "history-checkbox-outcome",
      classes: ["history-checkbox-outcome"],
      eventListeners: [
        {
          type: "click",
          listener: () => {
            console.log("지출 체크박스 클릭");
          },
        },
      ],
    });
    const labelOutcome = new Label({
      id: "history-label-outcome",
      classes: ["history-label-outcome"],
      for: "history-checkbox-outcome",
      textContent: "지출",
    });
    const spanOutcomeAmount = new Component("span", {
      classes: ["history-outcome-amount"],
      innerHtml: `1000000`,
    });

    const historyList = new HistoryList({
      historyItemOptions: data,
    });

    this.appendChildren([
      inputForm,
      divIncome.appendChildren([checkboxIncome, labelIncome, spanIncomeAmount]),
      divOutcome.appendChildren([
        checkboxOutcome,
        labelOutcome,
        spanOutcomeAmount,
      ]),
      historyList,
    ]);
  }
}

export default History;
