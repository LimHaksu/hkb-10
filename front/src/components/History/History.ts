import Component from "../Component";
import InputForm from "./InputForm";
import HistoryList from "./HistoryList";
import Input from "../common/Input";
import Label from "../common/Label";
import {
  CheckboxModel,
  TypeCheckbox,
  HistoryListModel,
  HistoryDataType,
} from "../../models/HistoryModel";
import "./History.scss";

class History extends Component {
  checkbox: typeof CheckboxModel;
  historyListData: typeof HistoryListModel;

  checkboxIncome: Input | null = null;
  checkboxOutcome: Input | null = null;
  historyList: HistoryList | null = null;

  constructor() {
    super("div", { id: "history", classes: ["history"] });

    this.render();

    this.checkbox = CheckboxModel;
    this.historyListData = HistoryListModel;

    this.subscribeModels();
    this.initDatas();
  }

  subscribeModels() {
    this.checkbox.subscribe(
      "subCheckboxInHistory",
      (isChecked: TypeCheckbox) => {
        (<HTMLInputElement>this.checkboxIncome?.view).checked =
          isChecked.income;
        (<HTMLInputElement>this.checkboxOutcome?.view).checked =
          isChecked.outcome;
      }
    );
    this.historyListData.subscribe(
      "subHistoryListInHistory",
      (historyDatas: HistoryDataType[]) => {
        this.historyList?.destructor();
        this.historyList = new HistoryList({
          historyItemOptions: historyDatas,
        });
        this.appendChild(this.historyList);
      }
    );
  }

  initDatas() {
    this.checkbox.initData();
    this.historyListData.initData();
  }

  render() {
    const inputForm = new InputForm();

    const divIncome = new Component("div", {
      id: "history-div-income",
      classes: ["history-div", "history-div-income"],
    });
    this.checkboxIncome = new Input({
      type: "checkbox",
      id: "history-checkbox-income",
      classes: ["history-checkbox-income"],
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            const isChecked = (<HTMLInputElement>event.currentTarget).checked;
            this.checkbox.setIsIncomeChecked(isChecked);
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
    this.checkboxOutcome = new Input({
      type: "checkbox",
      id: "history-checkbox-outcome",
      classes: ["history-checkbox-outcome"],
      eventListeners: [
        {
          type: "click",
          listener: (event) => {
            const isChecked = (<HTMLInputElement>event.currentTarget).checked;
            this.checkbox.setIsOutcomeChecked(isChecked);
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

    this.historyList = new HistoryList();

    this.appendChildren([
      inputForm,
      divIncome.appendChildren([
        this.checkboxIncome,
        labelIncome,
        spanIncomeAmount,
      ]),
      divOutcome.appendChildren([
        this.checkboxOutcome,
        labelOutcome,
        spanOutcomeAmount,
      ]),
      this.historyList,
    ]);
  }
}

export default History;
