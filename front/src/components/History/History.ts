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
import Path from "../../router/Path";
import "./History.scss";

class History extends Component {
  checkboxModel: typeof CheckboxModel;
  historyListModel: typeof HistoryListModel;

  checkboxIncome: Input | null = null;
  checkboxOutcome: Input | null = null;
  spanIncomeAmount: Component | null = null;
  spanOutcomeAmount: Component | null = null;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  historyList: HistoryList | null = null;

  constructor() {
    super("div", { id: "history", classes: ["history"] });

    this.render();

    this.checkboxModel = CheckboxModel;
    this.historyListModel = HistoryListModel;

    this.subscribeModels();
    this.initDatas();
  }

  setTotalIncomeOutcome(historyDatas: HistoryDataType[]) {
    this.totalIncome = 0;
    this.totalOutcome = 0;
    if (historyDatas instanceof Array) {
      historyDatas.forEach((data) => {
        if (data.income) {
          this.totalIncome += data.amount;
        } else {
          this.totalOutcome += data.amount;
        }
      });
    }
    this.spanIncomeAmount?.setInnerHtml(
      `${this.totalIncome.toLocaleString()}원`
    );
    this.spanOutcomeAmount?.setInnerHtml(
      `${this.totalOutcome.toLocaleString()}원`
    );
  }

  subscribeModels() {
    Path.subscribe("subPathInHistory", (pathName: string) => {
      CheckboxModel.setIsIncomeChecked(true);
      CheckboxModel.setIsOutcomeChecked(true);
    });

    this.checkboxModel.subscribe(
      "subCheckboxInHistory",
      (isChecked: TypeCheckbox) => {
        (<HTMLInputElement>this.checkboxIncome?.view).checked =
          isChecked.income;
        (<HTMLInputElement>this.checkboxOutcome?.view).checked =
          isChecked.outcome;
      }
    );

    this.historyListModel.subscribe(
      "subHistoryListInHistory",
      (historyDatas: HistoryDataType[]) => {
        this.historyList?.destructor();
        this.historyList = new HistoryList({
          historyItemOptions: historyDatas,
        });
        this.appendChild(this.historyList);
        this.setTotalIncomeOutcome(historyDatas);
      }
    );
  }

  initDatas() {
    this.checkboxModel.initData();
    this.historyListModel.initData();
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
            this.checkboxModel.setIsIncomeChecked(isChecked);
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
    this.spanIncomeAmount = new Component("span", {
      classes: ["history-income-amount"],
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
            this.checkboxModel.setIsOutcomeChecked(isChecked);
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
    this.spanOutcomeAmount = new Component("span", {
      classes: ["history-outcome-amount"],
    });

    this.historyList = new HistoryList();

    this.appendChildren([
      inputForm,
      divIncome.appendChildren([
        new Component("span").appendChildren([
          this.checkboxIncome,
          labelIncome,
        ]),
        this.spanIncomeAmount,
      ]),
      divOutcome.appendChildren([
        new Component("span").appendChildren([
          this.checkboxOutcome,
          labelOutcome,
        ]),
        this.spanOutcomeAmount,
      ]),
      this.historyList,
    ]);
  }
}

export default History;
